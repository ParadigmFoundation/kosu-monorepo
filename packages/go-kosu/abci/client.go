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

var (
	// ErrNotFound is returned when a Query could not found a resource
	ErrNotFound = errors.New("not found")
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
func (c *Client) Subscribe(ctx context.Context, q string) (<-chan rpctypes.ResultEvent, func(), error) {
	// Make sure the query is valid
	_, err := query.New(q)
	if err != nil {
		return nil, nil, err
	}

	// Start WS if not yet
	if httpC, ok := c.Client.(*client.HTTP); ok {
		if !httpC.IsRunning() {
			if err := httpC.Start(); err != nil {
				return nil, nil, err
			}
		}
	}

	ch, err := c.Client.Subscribe(ctx, "kosu", q)
	if err != nil {
		return nil, nil, err
	}

	closer := func() {
		if httpC, ok := c.Client.(*client.HTTP); ok {
			_ = httpC.Stop()
		}
	}

	return ch, closer, nil
}

// QueryRoundInfo performs a ABCIQuery to "/roundinfo"
func (c *Client) QueryRoundInfo() (*types.RoundInfo, error) {
	var pb types.RoundInfo
	if err := c.query("/chain/key", []byte("roundinfo"), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

// QueryConsensusParams performs a ABCI Query to "/consensusparams"
func (c *Client) QueryConsensusParams() (*types.ConsensusParams, error) {
	var pb types.ConsensusParams
	if err := c.query("/chain/key", []byte("consensusparams"), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

// QueryPoster performs a ABCI Query to "/posters/<addr>"
func (c *Client) QueryPoster(addr string) (*types.Poster, error) {
	var pb types.Poster
	if err := c.query("/poster/key", []byte(addr), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

func (c *Client) query(path string, data []byte, pb proto.Message) error {
	out, err := c.ABCIQuery(path, data)
	if err != nil {
		return err
	}
	res := out.Response

	if res.IsErr() {
		return errors.New(res.GetLog())
	}

	if len(res.Value) == 0 {
		return ErrNotFound
	}

	return proto.Unmarshal(res.Value, pb)
}
