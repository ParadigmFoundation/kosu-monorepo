package abci

import (
	"math/big"
	"testing"

	"go-kosu/abci/types"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/common"
	db "github.com/tendermint/tm-db"
)

func TestDeliverRebalanceTx(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	rtx := &types.TransactionRebalance{
		RoundInfo: &types.RoundInfo{
			Number:   1,
			StartsAt: 100,
			EndsAt:   110,
		},
	}

	tx, err := types.WrapTx(rtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(
		abci.RequestDeliverTx{Tx: buf},
	)

	t.Run("AssertCode", func(t *testing.T) {
		assert.Equal(t, abci.CodeTypeOK, res.Code,
			"Unexpected DeliveryTx Code, err=%v", res.Info)
	})

	t.Run("Assert Tags", func(t *testing.T) {
		expectedTags := []common.KVPair{
			{Key: []byte("tx.type"), Value: []byte("rebalance")},
			{Key: []byte("round.number"), Value: []byte("1")},
			{Key: []byte("round.start"), Value: []byte("100")},
			{Key: []byte("round.end"), Value: []byte("110")},
		}
		expectedEvents := []abci.Event{
			{Type: "tags", Attributes: expectedTags},
		}
		assert.Equal(t, expectedEvents, res.Events)
	})
}

func TestRebalanceRateLimit(t *testing.T) {
	// known total computed on wolfram alpha (and node.js) from below balances
	knownTotal := &big.Int{}
	knownTotal.SetString("209794192312476157368", 10)

	// expected limits computed on wolfram alpha:
	// - sum all poster balances (=> 'sum')
	// - calculate (balance / sum) for each (=> 'ratio')
	// - calculate (ratio * max_limit) for each (=> 'decimal_limit')
	// - floor decimal_limit (=> 'limit')
	// - limit = ExpectedLimit below, converted to correct type
	posterCases := []struct {
		Address       string
		Balance       string
		ExpectedLimit uint64
	}{
		{
			"0x00000000000000000000000000000000000000001",
			"34246874234973750268",
			uint64(16324),
		},
		{
			"0x00000000000000000000000000000000000000002",
			"1692165432169854765",
			uint64(806),
		},
		{
			"0x00000000000000000000000000000000000000003",
			"12259168432695218424",
			uint64(5843),
		},
		{
			"0x00000000000000000000000000000000000000004",
			"28964871648846924367",
			uint64(13806),
		},
		{
			"0x00000000000000000000000000000000000000005",
			"44726432169457899",
			uint64(21),
		},
		{
			"0x00000000000000000000000000000000000000006",
			"1362696487442343798",
			uint64(649),
		},
		{
			"0x00000000000000000000000000000000000000007",
			"1224689755452112",
			uint64(0),
		},
		{
			"0x00000000000000000000000000000000000000008",
			"131222464954423155735",
			uint64(62548),
		},
	}

	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	// create some poster accounts with realistic balances (set with string to avoid int overflow)
	for _, testCase := range posterCases {
		balance := &big.Int{}
		balance.SetString(testCase.Balance, 10)

		setPosterBalance(app, testCase.Address, balance)

		poster := app.store.Poster(testCase.Address)
		assert.Equal(t, uint64(0), poster.Limit, "Poster should have no limit before rebalance")
	}

	calculatedTotal := app.totalPosterStake()
	assert.Equal(t, knownTotal.Bytes(), calculatedTotal.Bytes(), "Calculated sum should match test case")

	// trigger rebalance to generate rate limits
	deliverRebalance(t, app, priv, 1, 110, 120)

	// after rebalance, limits should be set and correct
	for _, testCase := range posterCases {
		poster := app.store.Poster(testCase.Address)
		assert.Equal(t, testCase.ExpectedLimit, poster.Limit, "Poster limit should match test case")
	}
}

// HELPERS

func setPosterBalance(app *App, address string, balance *big.Int) {
	app.store.SetPoster(address, types.Poster{
		Balance: types.NewBigInt(balance.Bytes()),
	})
}

func deliverRebalance(t *testing.T, app *App, priv []byte, number, start, end uint64) {
	rtx := &types.TransactionRebalance{
		RoundInfo: &types.RoundInfo{
			Number:   number,
			StartsAt: start,
			EndsAt:   end,
		},
	}

	tx, err := types.WrapTx(rtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(abci.RequestDeliverTx{Tx: buf})

	t.Run("AssertCode", func(t *testing.T) {
		assert.Equal(t, abci.CodeTypeOK, res.Code,
			"Unexpected DeliveryTx Code, err=%v", res.Info)
	})
}
