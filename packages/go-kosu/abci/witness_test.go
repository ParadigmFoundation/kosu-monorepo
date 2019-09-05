package abci

import (
	"log"
	"testing"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	"github.com/tendermint/tendermint/crypto/tmhash"
	db "github.com/tendermint/tm-db"
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

	res := app.DeliverTx(abci.RequestDeliverTx{Tx: buf})

	log.Printf("res = %+v\n", res)
	assert.EqualValues(t, 0, res.Code, res.Log)
}
