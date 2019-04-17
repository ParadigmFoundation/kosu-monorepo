package abci

import (
	"fmt"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"

	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/config"
	tmflags "github.com/tendermint/tendermint/libs/cli/flags"
	"github.com/tendermint/tendermint/libs/common"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/node"
	"github.com/tendermint/tendermint/p2p"
	"github.com/tendermint/tendermint/privval"
	"github.com/tendermint/tendermint/proxy"
)

// Server wraps a tendermint node
type Server struct {
	node *node.Node
	cfg  *config.Config
}

// StartInProcessServer starts an InProcess ABCI app and server
// TODO: inject the config instead of root
func StartInProcessServer(app *App, root string) (*Server, error) {
	cfg, err := loadConfig(root)
	if err != nil {
		return nil, err
	}

	nodeKey, err := p2p.LoadOrGenNodeKey(cfg.NodeKeyFile())
	if err != nil {
		return nil, err
	}

	logger, err := tmflags.ParseLogLevel(cfg.LogLevel, log.NewTMLogger(os.Stdout), cfg.LogFormat)
	if err != nil {
		return nil, err
	}

	tm, err := node.NewNode(cfg,
		privval.LoadOrGenFilePV(
			cfg.PrivValidatorKeyFile(),
			cfg.PrivValidatorStateFile(),
		),
		nodeKey,
		proxy.NewLocalClientCreator(app),
		node.DefaultGenesisDocProviderFunc(cfg),
		node.DefaultDBProvider,
		node.DefaultMetricsProvider(cfg.Instrumentation),
		logger,
	)
	if err != nil {
		return nil, err
	}
	fmt.Printf("NODE INFO: %+v", tm.NodeInfo())

	srv := &Server{node: tm, cfg: cfg}
	if err := srv.start(); err != nil {
		return nil, err
	}

	return srv, nil
}

func (s *Server) start() error {
	// Stop upon receiving SIGTERM or CTRL-C
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		for sig := range c {
			fmt.Printf("captured %v, exiting...", sig)
			if s.node.IsRunning() {
				if err := s.node.Stop(); err != nil {
					fmt.Fprintf(os.Stderr, "stop: %+v", err)
				}
			}
			os.Exit(1)
		}
	}()

	return s.node.Start()
}

// Wait blocks until the server has been stopped
func (s *Server) Wait() { s.node.Wait() }

// Stop stops the server
func (s *Server) Stop() error { return s.node.Stop() }

// Listener return returns the external addresses wher the server is listening
func (s *Server) Listener() string { return s.cfg.P2P.ExternalAddress }

func loadConfig(homedir string) (*config.Config, error) {
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
