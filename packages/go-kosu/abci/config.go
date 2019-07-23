package abci

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/config"
	cfg "github.com/tendermint/tendermint/config"
	tmflags "github.com/tendermint/tendermint/libs/cli/flags"
	"github.com/tendermint/tendermint/libs/common"
	"github.com/tendermint/tendermint/libs/log"
)

const (
	// KOSUHOME is the default base directory
	KOSUHOME = ".kosu"
)

var errHomeDirNotFound = errors.New("homedir does not exists! Did you run the init command?")

// DefaultHomeDir is the default full path used to store config and data
var DefaultHomeDir = os.ExpandEnv(fmt.Sprintf("$HOME/%s", KOSUHOME))

// LoadConfig loads or creates an initial config
func LoadConfig(homedir string) (*config.Config, error) {
	if homedir == "" {
		homedir = DefaultHomeDir
	}

	if !common.FileExists(filepath.Join(homedir, "config", "config.toml")) {
		return nil, errHomeDirNotFound
	}

	// Have a config file, load it
	viper.Set("home", homedir)
	viper.SetConfigName("config")
	viper.AddConfigPath(homedir)
	viper.AddConfigPath(filepath.Join(homedir, "config"))

	// I don't think this ever returns an err.  It seems to create a default config if missing
	err := viper.ReadInConfig()
	if err != nil {
		return nil, errHomeDirNotFound
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

// LoadPrivateKey loads the validator's private key using homedir as the base path of Tendermint
func LoadPrivateKey(homedir string) ([]byte, error) {
	conf, err := LoadConfig(homedir)
	if err != nil {
		return nil, err
	}

	f, err := ioutil.ReadFile(conf.PrivValidatorKeyFile())
	if err != nil {
		return nil, err
	}

	// Couldn't find a better way to do this, perhaps TM provides utilities for this
	var filepv struct {
		PrivKey struct {
			Value string `json:"value"`
		} `json:"priv_key"`
	}
	if err := json.Unmarshal(f, &filepv); err != nil {
		return nil, err
	}

	return base64.StdEncoding.DecodeString(filepv.PrivKey.Value)
}

// NewLogger creates a new logger out of a given config
func NewLogger(config *cfg.Config) (log.Logger, error) {
	var w log.Logger
	switch config.LogFormat {
	case "json":
		w = log.NewTMJSONLogger(os.Stdout)
	case "", "plain":
		w = log.NewTMLogger(os.Stdout)
	case "none":
		w = log.NewNopLogger()
	}

	return tmflags.ParseLogLevel(config.LogLevel, w, "error")
}
