package abci

import (
	"context"
	"errors"

	"github.com/gogo/protobuf/proto"
	"github.com/tendermint/tendermint/libs/pubsub/query"
	"github.com/tendermint/tendermint/rpc/client"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"go-kosu/abci/types"
)

// Client wraps a tendermint/rpc/client.
// It adds convenience methods to make Broadcast and Query requests match our own types.
type Client struct {
	client.Client
	key []byte
}

// NewClient returns a new Client type.
// Key is the private key used to sign transactions.
func NewClient(c client.Client, key []byte) *Client {
	return &Client{Client: c, key: key}
}

// NewHTTPClient calls NewClient using a HTTPClient as ABCClient
func NewHTTPClient(addr string, key []byte) *Client {
	c := client.NewHTTP(addr, "/websocket")
	return NewClient(c, key)
}

// BroadcastTxAsync will return right away without waiting to hear if the transaction is even valid
func (c *Client) BroadcastTxAsync(tx interface{}) (*rpctypes.ResultBroadcastTx, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.Client.BroadcastTxAsync(buf)
}

// BroadcastTxSync will return with the result of running the transaction through CheckTx
func (c *Client) BroadcastTxSync(tx interface{}) (*rpctypes.ResultBroadcastTx, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.Client.BroadcastTxSync(buf)
}

// BroadcastTxCommit will wait until the transaction is committed in a block or until some timeout is reached
func (c *Client) BroadcastTxCommit(tx interface{}) (*rpctypes.ResultBroadcastTxCommit, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.Client.BroadcastTxCommit(buf)
}

func (c *Client) buildTx(tx interface{}) (tmtypes.Tx, error) {
	switch t := tx.(type) {
	case *types.TransactionWitness:
		t.Id = t.Hash()
	}

	stx, err := types.WrapTx(tx).SignedTransaction(c.key)
	if err != nil {
		return nil, err
	}

	enc, err := types.EncodeTx(stx)
	return tmtypes.Tx(enc), err
}

// Subscribe subscribes to to a given query using the WS API.
func (c *Client) Subscribe(ctx context.Context, q string) (<-chan rpctypes.ResultEvent, error) {
	// Make sure the query is valid
	_, err := query.New(q)
	if err != nil {
		return nil, err
	}

	// Start WS if not yet
	if httpC, ok := c.Client.(*client.HTTP); ok {
		if !httpC.IsRunning() {
			if err := httpC.Start(); err != nil {
				return nil, err
			}
		}
	}

	return c.Client.Subscribe(ctx, "kosu", q)
}

// QueryRoundInfo performs a ABCIQuery and translate the response into concrete types.
func (c *Client) QueryRoundInfo() (*types.RoundInfo, error) {
	out, err := c.ABCIQuery("/roundinfo", nil)
	if err != nil {
		return nil, err
	}
	res := out.Response

	if res.IsErr() {
		return nil, errors.New(res.GetInfo())
	}

	var info types.RoundInfo
	if err := proto.Unmarshal(res.Value, &info); err != nil {
		return nil, err
	}

	return &info, nil
}
