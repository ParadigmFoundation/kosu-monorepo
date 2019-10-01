package abci

import (
	"github.com/cosmos/cosmos-sdk/store/rootmulti"
	"github.com/tendermint/iavl"
	"github.com/tendermint/tendermint/lite"
	"github.com/tendermint/tendermint/lite/client"
	"github.com/tendermint/tendermint/lite/proxy"
	rpcclient "github.com/tendermint/tendermint/rpc/client"
	dbm "github.com/tendermint/tm-db"
)

// NewLite returns a RPC Client that uses the Lite client protocol.
// All the responses are verified with merkle proofs.
func NewLite(id string, endpoint string) (*proxy.Wrapper, error) {
	memProvider := lite.NewDBProvider("trusted.mem", dbm.NewMemDB()).SetLimit(10)
	lvlProvider := lite.NewDBProvider("trusted.lvl", dbm.NewDB("trust-base", dbm.GoLevelDBBackend, "."))
	trust := lite.NewMultiProvider(
		memProvider,
		lvlProvider,
	)

	node := rpcclient.NewHTTP(endpoint, "/websocket")
	source := client.NewProvider(id, node)

	cert := lite.NewDynamicVerifier(id, trust, source)

	_, err := trust.LatestFullCommit(id, 1, 1<<63-1)
	if err != nil {
		fc, err := source.LatestFullCommit(id, 1, 1)
		if err != nil {
			return nil, err

		}
		err = trust.SaveFullCommit(fc)
		if err != nil {
			return nil, err
		}
	}

	sc := proxy.SecureClient(node, cert)
	sc.RegisterOpDecoder(iavl.ProofOpIAVLValue, iavl.IAVLValueOpDecoder)
	sc.RegisterOpDecoder(iavl.ProofOpIAVLAbsence, iavl.IAVLAbsenceOpDecoder)
	sc.RegisterOpDecoder(rootmulti.ProofOpMultiStore, rootmulti.MultiStoreProofOpDecoder)

	return &sc, nil
}
