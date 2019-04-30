package abci

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/libs/common"
)

const (
	KOSUHOME = ".kosu"
	Home     = "home"
)

var DefaultHomeDir = os.ExpandEnv(fmt.Sprintf("$HOME/%s", KOSUHOME))

func LoadConfig(homedir string) (*config.Config, error) {
	if homedir == "" {
		homedir = DefaultHomeDir
	}

	if !common.FileExists(filepath.Join(homedir, "config", "config.toml")) {
		return nil, fmt.Errorf("missing homedir! Did you run the init command?")
	}

	// Have a config file, load it
	viper.Set("home", homedir)
	viper.SetConfigName("config")
	viper.AddConfigPath(homedir)
	viper.AddConfigPath(filepath.Join(homedir, "config"))

	// I don't think this ever returns an err.  It seems to create a default config if missing
	err := viper.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("missing homedir/config file. Did you run the init command?")
	}

	cfg := config.DefaultConfig()
	err = viper.Unmarshal(cfg)
	if err != nil {
		return nil, err
	}
	cfg.SetRoot(cfg.RootDir)
	config.EnsureRoot(cfg.RootDir)

	return cfg, nil
}
