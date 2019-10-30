package abci

import (
	"context"
	"errors"

	"github.com/gogo/protobuf/proto"

	"github.com/tendermint/tendermint/libs/pubsub/query"
	"github.com/tendermint/tendermint/rpc/client"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/cosmos/cosmos-sdk/codec"
	sdktypes "github.com/cosmos/cosmos-sdk/store/types"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store/cosmos"
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
	cdc store.Codec
}

// NewClient returns a new Client type.
// Key is the private key used to sign transactions.
func NewClient(c client.Client, key []byte) *Client {
	return &Client{Client: c, key: key, cdc: store.DefaultCodec}
}

// NewHTTPClient calls NewClient using a HTTPClient as ABCClient
func NewHTTPClient(addr string, key []byte) (*Client, error) {
	c := client.NewHTTP(addr, "/websocket")
	if err := c.Start(); err != nil {
		return nil, err
	}

	return NewClient(c, key), nil
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

	ch, err := c.Client.Subscribe(ctx, "kosu", q)
	if err != nil {
		return nil, nil, err
	}

	closer := func() { _ = c.Client.Unsubscribe(ctx, "kosu", q) }
	return ch, closer, nil
}

// QueryRoundInfo performs a ABCIQuery to "/roundinfo"
func (c *Client) QueryRoundInfo() (*types.RoundInfo, error) {
	var pb types.RoundInfo
	if err := c.Query("/store/chain/key", []byte("roundinfo"), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

// QueryConsensusParams performs a ABCI Query to "/consensusparams"
func (c *Client) QueryConsensusParams() (*types.ConsensusParams, error) {
	var pb types.ConsensusParams
	if err := c.Query("/store/chain/key", []byte("consensusparams"), &pb); err != nil {
		if err == ErrNotFound {
			return &types.ConsensusParams{}, nil
		}
		return nil, err
	}

	return &pb, nil
}

// QueryLastEvent performs a ABCI Query to "/lastevent".
// `lastevent` keeps track of the last block height recorded from the Ethereum chain
func (c *Client) QueryLastEvent() (uint64, error) {
	out, err := c.ABCIQuery("/store/chain/key", []byte("lastevent"))
	if err != nil {
		return 0, err
	}
	res := out.Response

	if res.IsErr() {
		return 0, errors.New(res.GetLog())
	}

	if len(res.Value) == 0 {
		return 0, nil
	}

	buf := proto.NewBuffer(res.Value)
	return buf.DecodeFixed64()
}

// QueryPoster performs a ABCI Query to "/posters/<addr>"
func (c *Client) QueryPoster(addr string) (*types.Poster, error) {
	var pb types.Poster
	if err := c.Query("/store/poster/key", []byte(addr), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

// QueryValidator performs a ABCI Query to "/validator/<addr>"
func (c *Client) QueryValidator(addr string) (*types.Validator, error) {
	var pb types.Validator
	if err := c.Query("/store/validator/key", []byte(addr), &pb); err != nil {
		return nil, err
	}

	return &pb, nil
}

// QueryTotalOrders performs a ABCI Query to "/chain/totalorders"
func (c *Client) QueryTotalOrders() (uint64, error) {
	var num uint64
	if err := c.Query("/store/orders/key", cosmos.LengthKey(), &num); err != nil {
		return 0, err
	}

	return num, nil
}

// QueryLatestOrders queries a collection (subspace) of orders in the `orders` store.
func (c *Client) QueryLatestOrders() ([]types.TransactionOrder, error) {
	KVs, err := c.querySubSpace("orders", []byte{0x01})
	if err != nil {
		return nil, err
	}

	txs := make([]types.TransactionOrder, len(KVs))
	for i, kv := range KVs {
		var tx types.TransactionOrder
		if err := c.cdc.Decode(kv.Value, &tx); err != nil {
			return nil, err
		}
		txs[i] = tx
	}

	return txs, nil
}

// Query is a generic query interface.
// It will use the store.DefaultCodec codec to decode the `response.Value`.
func (c *Client) Query(path string, data []byte, v interface{}) error {
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

	return c.cdc.Decode(res.Value, v)
}

// querySubSpace
func (c *Client) querySubSpace(store string, data []byte) ([]sdktypes.KVPair, error) {
	out, err := c.ABCIQuery("/store/"+store+"/subspace", data)
	if err != nil {
		return nil, err
	}
	res := out.Response

	if res.IsErr() {
		return nil, errors.New(res.GetLog())
	}

	var KVs []sdktypes.KVPair
	cdc := codec.New()
	if err := cdc.UnmarshalBinaryLengthPrefixed(res.Value, &KVs); err != nil {
		return nil, err
	}

	return KVs, nil
}
