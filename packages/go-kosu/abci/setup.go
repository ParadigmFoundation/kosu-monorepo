package abci

import (
	"fmt"
	"os"

	cfg "github.com/tendermint/tendermint/config"
	cmn "github.com/tendermint/tendermint/libs/common"
	log "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/p2p"
	"github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/types"
	tmtime "github.com/tendermint/tendermint/types/time"
)

var chainIDPrefix = "kosu-chain-%v"

// InitTendermint creates an initial tendermint file structure.
func InitTendermint(homedir string) error {
	logger := log.NewTMLogger(log.NewSyncWriter(os.Stdout)).With("module", "main")
	return InitTendermintWithLogger(homedir, logger)
}

// InitTendermintWithLogger creates an initial tendermint file structure using a custom logger.
func InitTendermintWithLogger(homedir string, logger log.Logger) error {
	if homedir == "" {
		homedir = DefaultHomeDir
	}

	return createConfig(homedir, logger)
}

// Code from tendermint init...
func createConfig(homedir string, logger log.Logger) error {
	config := cfg.DefaultConfig()
	if homedir == "" {
		config.SetRoot(DefaultHomeDir)
	} else {
		config.SetRoot(homedir)
	}

	cfg.EnsureRoot(config.RootDir)

	// private validator
	privValKeyFile := config.PrivValidatorKeyFile()
	privValStateFile := config.PrivValidatorStateFile()
	var pv *privval.FilePV
	if cmn.FileExists(privValKeyFile) {
		pv = privval.LoadFilePV(privValKeyFile, privValStateFile)
		logger.Info("Found private validator", "keyFile", privValKeyFile,
			"stateFile", privValStateFile)
	} else {
		pv = privval.GenFilePV(privValKeyFile, privValStateFile)
		pv.Save()
		logger.Info("Generated private validator", "keyFile", privValKeyFile,
			"stateFile", privValStateFile)
	}

	nodeKeyFile := config.NodeKeyFile()
	if cmn.FileExists(nodeKeyFile) {
		logger.Info("Found node key", "path", nodeKeyFile)
	} else {
		if _, err := p2p.LoadOrGenNodeKey(nodeKeyFile); err != nil {
			return err
		}
		logger.Info("Generated node key", "path", nodeKeyFile)
	}

	// genesis file
	genFile := config.GenesisFile()
	if cmn.FileExists(genFile) {
		logger.Info("Found genesis file", "path", genFile)
	} else {
		genDoc := types.GenesisDoc{
			ChainID:         fmt.Sprintf(chainIDPrefix, cmn.RandStr(6)),
			GenesisTime:     tmtime.Now(),
			ConsensusParams: types.DefaultConsensusParams(),
		}
		key := pv.GetPubKey()
		genDoc.Validators = []types.GenesisValidator{{
			Address: key.Address(),
			PubKey:  key,
			Power:   10,
		}}

		if err := genDoc.SaveAs(genFile); err != nil {
			return err
		}
		logger.Info("Generated genesis file", "path", genFile)
	}

	return nil
}
