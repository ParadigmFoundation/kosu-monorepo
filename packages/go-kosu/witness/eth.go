package witness

import (
	"context"
	"log"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var _ Provider = &EthereumProvider{}

// EthereumProvider implements a Provider that connect to the Ethereum Blockchain
type EthereumProvider struct {
	client *ethclient.Client
	eAddr  string
}

// NewEthereumProvider returns a new EthereumProvider
func NewEthereumProvider(addr string) (*EthereumProvider, error) {
	client, err := ethclient.Dial(addr)
	if err != nil {
		return nil, err
	}

	nID, err := client.NetworkID(context.Background())
	if err != nil {
		return nil, err
	}

	eAddr, err := GetContractAddress(nID, "EventEmitter")
	if err != nil {
		return nil, err
	}

	return &EthereumProvider{client, eAddr}, nil
}

// WatchEvents watches for emitted events from the EventEmitter contract.
// First, emits the existing events in the blockchain, then subscribes to get the emitted events as they happen
func (w *EthereumProvider) WatchEvents(ctx context.Context, fn EventHandler) error {
	emitter, err := NewEventEmitter(
		common.HexToAddress(w.eAddr),
		w.client,
	)
	if err != nil {
		return err
	}

	f, err := emitter.FilterKosuEvent(nil)
	if err != nil {
		return err
	}
	defer f.Close() // nolint:errcheck

	events := make(chan *EventEmitterKosuEvent)
	defer close(events)

	sub, err := emitter.WatchKosuEvent(nil, events)
	if err != nil {
		return err
	}
	defer sub.Unsubscribe()

	for f.Next() {
		fn(f.Event)
	}

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-sub.Err():
			log.Fatalf("WatchEvents: err = %+v", err)
			return err
		case evt := <-events:
			fn(evt)
		}
	}
}

// WatchBlocks watches for incoming block headers
func (w *EthereumProvider) WatchBlocks(ctx context.Context, fn BlockHandler) error {
	ch := make(chan *types.Header)
	defer close(ch)

	sub, err := w.client.SubscribeNewHead(ctx, ch)
	if err != nil {
		return err
	}
	defer sub.Unsubscribe()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-sub.Err():
			return err
		case header := <-ch:
			fn(header)
		}
	}
}

// GetLastBlockNumber returns the latest known block number from the chain
func (w *EthereumProvider) GetLastBlockNumber(ctx context.Context) (uint64, error) {
	block, err := w.client.BlockByNumber(ctx, nil)
	if err != nil {
		return 0, err
	}

	return block.NumberU64(), nil
}
