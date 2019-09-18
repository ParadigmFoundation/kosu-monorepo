package witness

import (
	"context"
	"os"
	"time"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"

	"github.com/tendermint/tendermint/libs/log"
)

var _ Provider = &EthereumProvider{}

// EthereumProviderOpts controls internal provider options
type EthereumProviderOpts struct {
	Delay         time.Duration
	DelayFactor   int
	DelayMax      time.Duration
	SnapshotBlock uint64
}

// DefaultEthereumProviderOpts provides sensible options for the provider
// This options are used when NewEthereumProvider is invoked
var DefaultEthereumProviderOpts = EthereumProviderOpts{
	Delay:       1 * time.Second,
	DelayFactor: 2,
	DelayMax:    30 * time.Second,
}

// EthereumProvider implements a Provider that connect to the Ethereum Blockchain
type EthereumProvider struct {
	client *ethclient.Client
	eAddr  string

	log  log.Logger
	opts EthereumProviderOpts
}

// NewEthereumProvider returns a new EthereumProvider
func NewEthereumProvider(addr string) (*EthereumProvider, error) {
	return NewEthereumProviderWithOpts(addr, DefaultEthereumProviderOpts)
}

// NewEthereumProviderWithOpts returns a new EthereumProvider given opts
func NewEthereumProviderWithOpts(addr string, opts EthereumProviderOpts) (*EthereumProvider, error) {
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

	eth := &EthereumProvider{client, eAddr, nil, opts}
	return eth.WithLogger(log.NewTMLogger(os.Stdout)), nil
}

// WithLogger attaches a logger
func (w *EthereumProvider) WithLogger(logger log.Logger) *EthereumProvider {
	if logger == nil {
		logger = log.NewNopLogger()
	}
	w.log = logger.With("module", "ethereum")
	return w
}

func (w *EthereumProvider) backoff(name string, fn func() error) error {
	delay := w.opts.Delay

	for {
		err := fn()
		if err == context.Canceled || err == context.DeadlineExceeded {
			return err
		}

		w.log.Error("Watcher: retrying...", "op", name, "err", err, "in", delay)
		time.Sleep(delay)

		delay = delay * time.Duration(w.opts.DelayFactor)
		if delay > w.opts.DelayMax {
			delay = w.opts.DelayMax
		}
	}
}

// WatchEvents watches for emitted events from the EventEmitter contract.
// First, emits the existing events in the blockchain, then subscribes to get the emitted events as they happen
func (w *EthereumProvider) WatchEvents(ctx context.Context, fn EventHandler) error {
	w.log.Info("Watching for Events", "snapshot", w.opts.SnapshotBlock)
	return w.backoff("events", func() error {
		return w.watchEvents(ctx, fn)
	})
}

func (w *EthereumProvider) watchEvents(ctx context.Context, fn EventHandler) error {
	emitter, err := NewEventEmitter(
		common.HexToAddress(w.eAddr),
		w.client,
	)
	if err != nil {
		return err
	}

	// Get events from SnapshotBlock
	fOpts := &bind.FilterOpts{
		Start: w.opts.SnapshotBlock,
	}
	f, err := emitter.FilterKosuEvent(fOpts)
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

	wFn := func(evt *EventEmitterKosuEvent) {
		w.log.Debug("new event", "type", evt.EventType, "block", evt.Raw.BlockNumber)
		fn(evt)
	}

	for f.Next() {
		wFn(f.Event)
	}

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case err := <-sub.Err():
			w.log.Error("watchEvents", "err", err)
			return err
		case evt := <-events:
			wFn(evt)
		}
	}
}

// WatchBlocks watches for incoming block headers
func (w *EthereumProvider) WatchBlocks(ctx context.Context, fn BlockHandler) error {
	return w.backoff("blocks", func() error {
		return w.watchBlocks(ctx, fn)
	})
}

func (w *EthereumProvider) watchBlocks(ctx context.Context, fn BlockHandler) error {
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
