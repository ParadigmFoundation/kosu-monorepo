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

const (
	// KosuEventEmitterAddress is the address of the EventEmitter contract
	// NOTE: the 'ParadigmEvent' has not yet been renamed to 'KosuEvent' in 
	// 	the EventEmitter contract yet.
	KosuEventEmitterAddress = "0xf2098FB608098A562d24CCde594A304d739cc4B7"
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

	events, err := NewEventEmitter(
		common.HexToAddress(KosuEventEmitterAddress),
		client,
	)
	if err != nil {
		return nil, err
	}

	return &EthereumProvider{client, events}, nil
}

// GetBlockNumber returns the latest block number.
func (w *EthereumProvider) GetBlockNumber(ctx context.Context) (*big.Int, error) {
	blk, err := w.client.BlockByNumber(ctx, nil)
	if err != nil {
		return nil, err
	}
	return blk.Number(), nil
}

// HandleEvents handles an emitted event from the EventEmitter contract.
// HandleEvents first Filters the existing events in the blockchain, then
// subscribes to get the emitted events as they happen
func (w *EthereumProvider) HandleEvents(ctx context.Context, fn func(e *Event)) error {
	var lastBlock uint64
	handle := func(e *EventEmitterParadigmEvent) {
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

	f, err := w.events.FilterParadigmEvent(nil)
	if err != nil {
		return err
	}

	for f.Next() {
		handle(f.Event)
	}

	events := make(chan *EventEmitterParadigmEvent, 128)
	sub, err := w.events.WatchParadigmEvent(nil, events)
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

func handlePosterRegistryUpdate(evt *EventEmitterParadigmEvent) (*Event, error) {
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

// HandleBlocks handles an incoming Block header.
func (w *EthereumProvider) HandleBlocks(ctx context.Context, fn func(hdr *Block)) error {
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
