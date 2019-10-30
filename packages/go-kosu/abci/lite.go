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
func NewLite(endpoint string) (*proxy.Wrapper, error) {
	node := rpcclient.NewHTTP(endpoint, "/websocket")
	status, err := node.Status()
	if err != nil {
		return nil, err
	}
	chainID := status.NodeInfo.Network

	memProvider := lite.NewDBProvider("trusted.mem", dbm.NewMemDB()).SetLimit(10)
	lvlProvider := lite.NewDBProvider("trusted.lvl", dbm.NewDB("trust-base", dbm.GoLevelDBBackend, "."))
	trust := lite.NewMultiProvider(
		memProvider,
		lvlProvider,
	)

	source := client.NewProvider(chainID, node)

	cert := lite.NewDynamicVerifier(chainID, trust, source)

	if _, err := trust.LatestFullCommit(chainID, 1, 1<<63-1); err != nil {
		fc, err := source.LatestFullCommit(chainID, 1, 1)
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
