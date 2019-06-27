package cosmos

import (
	"testing"

	"go-kosu/store"
	"go-kosu/store/storetest"

	"github.com/tendermint/tendermint/libs/db"
)

func TestCosmosStore(t *testing.T) {
	for _, cdc := range []Codec{
		&ProtoCodec{},
		&GobCodec{},
	} {
		t.Run(cdc.String(), func(t *testing.T) {
			f := func() (store.Store, func()) {
				db := db.NewMemDB()
				return NewStore(db, cdc), func() { db.Close() }
			}

			storetest.TestSuite(t, f)
		})
	}
}
