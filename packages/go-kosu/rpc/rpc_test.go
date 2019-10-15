package rpc

import (
	"context"
	"testing"
	"time"

	"github.com/ethereum/go-ethereum/rpc"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/tests"

	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"
	db "github.com/tendermint/tm-db"
)

func waitForNewBlock(t *testing.T, client *rpc.Client) {
	ch := make(chan interface{})
	defer close(ch)

	sub, err := client.Subscribe(context.Background(), "kosu", ch, "newBlocks")
	require.NoError(t, err)
	defer sub.Unsubscribe()

	select {
	case err := <-sub.Err():
		t.Error(err)
	case <-ch:
	}
}

func TestRPC(t *testing.T) {
	cases := []struct {
		name string
		run  func(*testing.T, *abci.App, *abci.Client, *rpc.Client)
	}{
		{"LatestHeight", LatestHeight},
		{"AddOrders", AddOrders},
		{"RebalancePeriod", RebalancePeriod},
		{"NewRebalances", NewRebalances},
		{"NumberPosters", NumberPosters},
		{"GetBlocks", GetBlocks},
	}

	for _, test := range cases {
		t.Run(test.name, func(t *testing.T) {
			app, closer := tests.StartServer(t, db.NewMemDB())
			defer closer()

			appClient, err := app.NewClient()
			require.NoError(t, err)
			defer appClient.Stop() // nolint:errcheck

			srv, err := NewServer(app.NewClient)
			require.NoError(t, err)

			rpcClient := rpc.DialInProc(srv)
			defer rpcClient.Close()

			test.run(t, app, appClient, rpcClient)
		})
	}
}

func LatestHeight(t *testing.T, _ *abci.App, _ *abci.Client, rpcClient *rpc.Client) {
	var latest uint64
	// Get the initial (prior the first block is mined)
	require.NoError(t, rpcClient.Call(&latest, "kosu_latestHeight"))
	assert.EqualValues(t, 0, latest)

	waitForNewBlock(t, rpcClient)
	require.NoError(t, rpcClient.Call(&latest, "kosu_latestHeight"))
	assert.EqualValues(t, 1, latest)
}

func AddOrders(t *testing.T, app *abci.App, appClient *abci.Client, rpcClient *rpc.Client) {
	// nolint:lll
	validTx := &types.TransactionOrder{
		SubContract:     "0xebe8fdf63db77e3b41b0aec8208c49fa46569606",
		Maker:           "0xe3ec7592166d0145b9677f5f45dd1bd95ffe6596",
		MakerSignature:  "0xce84772cbbbe5a844c9002e6d54e53d72830b890ff1ea1521cbd86faada28aa136997b5cd3cafd85e887a9d6fc25bb2bfbe03fc6319d371b2c976f3374bcd8c300",
		PosterSignature: "0xc3550b7ceab610e638dfb1b33e5cf7aaf9490854197328eadbe8ac049adef7510a07a0ea046fa1d410c5cc1048828152b9368a8d8925f8f0072192ebfe1bbb3101",
	}
	invalidTx := &types.TransactionOrder{
		SubContract:     "0xfff",
		Maker:           "0xfff",
		MakerSignature:  "0xfff",
		PosterSignature: "0xfff",
	}

	// this poster address is generated out of the validTx
	poster := types.Poster{
		Balance: types.NewBigIntFromInt(100),
		Limit:   10,
	}
	app.Store().SetPoster("0x02fbf1aa49bc3b9631e8e96572935a5894879724", poster)

	var remaining uint64
	err := rpcClient.Call(&remaining, "kosu_remainingLimit")
	require.NoError(t, err)
	assert.Equal(t, poster.Limit, remaining)

	params := []interface{}{validTx, invalidTx}
	result := &AddOrdersResult{}

	err = rpcClient.Call(result, "kosu_addOrders", params)
	require.NoError(t, err)

	assert.Len(t, result.Accepted, 1)
	assert.Len(t, result.Rejected, 1)

	waitForNewBlock(t, rpcClient)
	var total uint64
	err = rpcClient.Call(&total, "kosu_totalOrders")
	require.NoError(t, err)
	assert.EqualValues(t, 1, total)

	err = rpcClient.Call(&remaining, "kosu_remainingLimit")
	require.NoError(t, err)
	assert.Equal(t, poster.Limit-1, remaining)
}

func newTestRebalanceTx(number, starts uint64) *types.TransactionRebalance {
	return &types.TransactionRebalance{
		RoundInfo: &types.RoundInfo{
			Number:   number,
			StartsAt: starts,
			EndsAt:   starts + uint64(abci.GenesisAppState.ConsensusParams.PeriodLength),
		},
	}
}

func RebalancePeriod(t *testing.T, _ *abci.App, appClient *abci.Client, rpcClient *rpc.Client) {
	tx := newTestRebalanceTx(1, 10)
	res, err := appClient.BroadcastTxCommit(tx)
	require.NoError(t, err)
	require.True(t, res.DeliverTx.IsOK())

	var result types.RoundInfo
	require.NoError(t,
		rpcClient.Call(&result, "kosu_roundInfo"),
	)

	assert.Equal(t, tx.RoundInfo.String(), result.String())
}

func NewRebalances(t *testing.T, app *abci.App, appClient *abci.Client, rpcClient *rpc.Client) {
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()

	ch := make(chan *types.TransactionRebalance)
	sub, err := rpcClient.Subscribe(ctx, "kosu", ch, "newRebalances")
	require.NoError(t, err)
	defer sub.Unsubscribe()

	require.NoError(t, err)

	tx := newTestRebalanceTx(1, 10)
	res, err := appClient.BroadcastTxSync(tx)
	require.NoError(t, err)
	require.Zero(t, res.Code, res.Log)

	select {
	case <-ctx.Done():
		t.Error(ctx.Err())
	case err := <-sub.Err():
		t.Error(err)
	case e := <-ch:
		assert.Equal(t, tx.String(), e.String())
	}
}

func NumberPosters(t *testing.T, app *abci.App, _ *abci.Client, rpcClient *rpc.Client) {
	addresses := []string{
		"0x0000000000000000000000000000000000000001",
		"0x0000000000000000000000000000000000000002",
		"0x0000000000000000000000000000000000000003",
		"0x0000000000000000000000000000000000000004",
	}

	for _, addr := range addresses {
		app.Store().SetPoster(addr, types.Poster{
			Balance: types.NewBigIntFromInt(100),
		})
	}

	var num uint64
	err := rpcClient.Call(&num, "kosu_numberPosters")
	require.NoError(t, err)

	assert.EqualValues(t, len(addresses), num)
}

func GetBlocks(t *testing.T, app *abci.App, _ *abci.Client, rpcClient *rpc.Client) {
	t.Run("First block", func(t *testing.T) {
		waitForNewBlock(t, rpcClient)

		var blocks []*tmtypes.Block
		err := rpcClient.Call(&blocks, "kosu_getBlocks", []int64{1})
		require.NoError(t, err)
		require.Len(t, blocks, 1)
		block := blocks[0]
		assert.EqualValues(t, 1, block.Height)
	})
	t.Run("non-existent block number", func(t *testing.T) {
		var blocks []*rpctypes.ResultBlock
		err := rpcClient.Call(&blocks, "kosu_getBlocks", []int64{1, 2, 3, 4, 9999})
		require.Error(t, err)
		assert.Contains(t, err.Error(), "Height must be less than or equal to the current blockchain height")
		assert.Empty(t, blocks)
	})
}
