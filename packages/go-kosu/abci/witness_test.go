package abci

import (
	"go-kosu/abci/types"
	"log"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/libs/db"
)

func TestDeliverWitnessTx(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	app.currentValidators = []abci.Validator{
		{Address: []byte{0xff, 0xff, 0xff, 0xff}, Power: 1},
	}

	_, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	wtx := &types.TransactionWitness{
		Block:   1,
		Address: "ffffffff",
	}

	tx, err := types.WrapTx(wtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(buf)

	log.Printf("res = %+v\n", res)
	assert.EqualValues(t, 0, res.Code, res.Log)
}
