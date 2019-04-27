package abci

import (
	"github.com/tendermint/tendermint/rpc/client"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"paradigmcore/abci/types"
)

// Client wraps a tendermint/rpc/client.
// It adds convenience methods to make Broadcast and Query requests match our own types.
type Client struct {
	abci client.ABCIClient
	key  []byte
}

// NewClient returns a new Client type.
// Key is the private key used to sign transactions.
func NewClient(c client.ABCIClient, key []byte) *Client {
	return &Client{abci: c, key: key}
}

// NewHTTPClient calls NewClient using a HTTPClient as ABCClient
func NewHTTPClient(addr string, key []byte) *Client {
	c := client.NewHTTP(addr, addr+"/websocket")
	return NewClient(c, key)
}

// BroadcastTxAsync will return right away without waiting to hear if the transaction is even valid
func (c *Client) BroadcastTxAsync(tx interface{}) (*rpctypes.ResultBroadcastTx, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.abci.BroadcastTxAsync(buf)
}

// BroadcastTxSync will return with the result of running the transaction through CheckTx
func (c *Client) BroadcastTxSync(tx interface{}) (*rpctypes.ResultBroadcastTx, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.abci.BroadcastTxSync(buf)
}

// BroadcastTxCommit will wait until the transaction is committed in a block or until some timeout is reached
func (c *Client) BroadcastTxCommit(tx interface{}) (*rpctypes.ResultBroadcastTxCommit, error) {
	buf, err := c.buildTx(tx)
	if err != nil {
		return nil, err
	}

	return c.abci.BroadcastTxCommit(buf)
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
