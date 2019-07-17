package abci

import (
	"go-kosu/abci/types"
	"log"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/crypto/tmhash"
	"github.com/tendermint/tendermint/libs/db"
)

func TestDeliverWitnessTx(t *testing.T) {
	db := db.NewMemDB()
	done, app := newTestApp(t, db)
	defer done()

	pub, priv, err := types.NewKeyPair()
	require.NoError(t, err)

	// set a new validator
	nodeID := tmhash.SumTruncated(pub)
	app.store.SetValidator(nodeID, &types.Validator{
		Power:     1,
		PublicKey: pub,
		Balance:   types.NewBigInt([]byte{0x00}),
	})

	wtx := &types.TransactionWitness{
		Block:     1,
		Address:   "ffffffff",
		PublicKey: pub,
	}

	tx, err := types.WrapTx(wtx).SignedTransaction(priv)
	require.NoError(t, err)

	buf, err := types.EncodeTx(tx)
	require.NoError(t, err)

	res := app.DeliverTx(buf)

	log.Printf("res = %+v\n", res)
	assert.EqualValues(t, 0, res.Code, res.Log)
}
