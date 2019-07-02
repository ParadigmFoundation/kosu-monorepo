package witness

import (
	"context"
	"errors"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var _ Provider = &EthereumProvider{}

// EthereumProvider implements a Provider that connect to the Ethereum Blockchain
type EthereumProvider struct {
	client *ethclient.Client
	events *EventEmitter
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

	cAddr, err := GetContractAddress(nID, "EventEmitter")
	if err != nil {
		return nil, err
	}

	events, err := NewEventEmitter(
		common.HexToAddress(cAddr),
		client,
	)
	if err != nil {
		return nil, err
	}

	return &EthereumProvider{client, events}, nil
}

func (w *EthereumProvider) handleEvents(ctx context.Context, fn func(e *Event)) error {
	var lastBlock uint64
	handle := func(e *EventEmitterKosuEvent) {
		lastBlock = e.Raw.BlockNumber

		switch e.EventType {
		case "PosterRegistryUpdate":
			event, err := handlePosterRegistryUpdate(e)
			// TODO: better error handling
			if err != nil {
				fmt.Printf("err: %+v", err)
			}
			fn(event)
		}
	}

	f, err := w.events.FilterKosuEvent(nil)
	if err != nil {
		return err
	}

	for f.Next() {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			handle(f.Event)
		}
	}

	events := make(chan *EventEmitterKosuEvent, 128)
	sub, err := w.events.WatchKosuEvent(nil, events)
	if err != nil {
		return err
	}
	defer sub.Unsubscribe()

	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
			return err
		case e := <-events:
			// Avoid duplication with events come from Filter
			if e.Raw.BlockNumber > lastBlock {
				handle(e)
			}
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

func handlePosterRegistryUpdate(evt *EventEmitterKosuEvent) (*Event, error) {
	if len(evt.Data) != 2 {
		return nil, errors.New("invalid data")
	}

	blkNum := new(big.Int)
	blkNum.SetUint64(evt.Raw.BlockNumber)
	block := Block{
		Number: blkNum,
		Hash:   evt.Raw.BlockHash.Bytes(),
	}

	addr := common.BytesToAddress(evt.Data[0][:])
	amount := big.NewInt(0)
	amount.SetBytes(evt.Data[1][:])

	return &Event{
		Block:   block,
		Address: addr.String(),
		Amount:  amount,
	}, nil
}

func (w *EthereumProvider) handleBlocks(ctx context.Context, fn func(hdr *Block)) error {
	ch := make(chan *types.Header)
	sub, err := w.client.SubscribeNewHead(ctx, ch)
	if err != nil {
		return err
	}
	defer sub.Unsubscribe()

	for {
		select {
		case err := <-sub.Err():
			return err
		case header := <-ch:
			blk := &Block{
				Hash:   header.Hash().Bytes(),
				Number: header.Number,
			}
			fn(blk)
		case <-ctx.Done():
			return ctx.Err()
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

// WatchEvents watches emitted events from the EventEmitter contract.
// WatchEvents first Filters the existing events in the blockchain, then
// subscribes to get the emitted events as they happen
func (w *EthereumProvider) WatchEvents(ctx context.Context, ch chan *Event) error {
	return w.handleEvents(ctx, func(e *Event) {
		ch <- e
	})
}

// WatchBlocks watches for an incoming Block headers.
func (w *EthereumProvider) WatchBlocks(ctx context.Context, ch chan *Block) error {
	return w.handleBlocks(ctx, func(b *Block) {
		ch <- b
	})
}
