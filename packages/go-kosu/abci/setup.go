package abci

import (
	"fmt"
	"os"
	"strings"

	cfg "github.com/tendermint/tendermint/config"
	cmn "github.com/tendermint/tendermint/libs/common"
	log "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/p2p"
	"github.com/tendermint/tendermint/privval"
	tmtypes "github.com/tendermint/tendermint/types"
	tmtime "github.com/tendermint/tendermint/types/time"

	"go-kosu/abci/types"
)

var chainIDPrefix = "kosu-chain-%v"

// DefaultConfig returns the default Tendermint config for a Kosu node
var DefaultConfig = cfg.DefaultConfig()

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
	config := DefaultConfig
	if homedir == "" {
		config.SetRoot(DefaultHomeDir)
	} else {
		config.SetRoot(homedir)
	}
	cfg.EnsureRoot(config.RootDir)

	// Update default config values
	config.LogLevel = strings.Join(
		[]string{"app:info,witness:info", config.LogLevel}, ",",
	)
	// WriteConfigFile will overwrite the default config written by .EnsureRoot
	cfg.WriteConfigFile(config.RootDir+"/config/config.toml", config)

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
		genDoc := tmtypes.GenesisDoc{
			ChainID:         fmt.Sprintf(chainIDPrefix, cmn.RandStr(6)),
			GenesisTime:     tmtime.Now(),
			ConsensusParams: tmtypes.DefaultConsensusParams(),
			AppState:        appState.JSON(),
		}
		key := pv.GetPubKey()
		genDoc.Validators = []tmtypes.GenesisValidator{{
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

var appState = &Genesis{
	ConsensusParams: types.ConsensusParams{
		PeriodLength: 10,
		PeriodLimit:  100000,
	},
}
