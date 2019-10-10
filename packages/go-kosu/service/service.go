package service

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"

	tmlog "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/lite/proxy"
	"github.com/tendermint/tendermint/privval"
	tmdb "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/rpc"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/witness"
)

// Mode is the mode in which the node will start
type Mode int

const (
	// FullNode mode
	// A Full node will store the blockchain on disk and also start the witness process
	FullNode Mode = iota

	// Lite mode
	// A Lite node will not store the blockchain.
	// A Lite node connects to a full node to forward the requests.
	// These requests are validated against Merkle Proofs.
	Lite
)

// RPC is the RPC options
type RPC struct {
	HTTPPort int
	WSPort   int
}

// Service represents a Service. This structures holds the parameters to setup the service
type Service struct {
	// Logger is going to be passed to all the subsequent services
	// if none is specified NewTMLogger(os.Stdout) will be used
	Logger tmlog.Logger

	// Mode indicates how to start the node
	// FullNode will start a fullnode and the witness process (if web3 is specified)
	// Lite will start the node in lite mode
	Mode Mode

	// HomeDir is the base directory where the config and database live
	// If not specified $HOME/.kosud will be used
	HomeDir string

	// DB is the database manager to be used
	// If not specified goleveldb will be used using HomeDir as the storage directory
	DB tmdb.DB

	// LAddr is the ListenAddress for the node
	LAddr string

	// WEB3 is the address to be used by the Witness process
	WEB3 string

	// FullNode is used in lite mode and represent the fullnode RPC address where the lite client will connect to
	// This value can't be empty if lite mode is specified
	FullNode string

	// RPC will be enabled using the ports defined in RPC struct if != nil
	RPC *RPC

	// RemoteSignerListener
	RemoteSignerListener string
}

func (s *Service) setDefaults() error {
	if s.HomeDir == "" {
		os.ExpandEnv("$HOME/.kosud")
	}

	cfg, err := abci.LoadConfig(s.HomeDir)
	if err != nil {
		return err
	}
	s.Logger, err = abci.NewLogger(cfg)
	if err != nil {
		return err
	}

	if s.LAddr == "" {
		s.LAddr = "tcp://0.0.0.0:26657"
	}

	if s.DB == nil {
		name := "kosu"
		if s.Mode == Lite {
			name = name + "-lite"
		}
		db, err := newDB(name, s.HomeDir)
		if err != nil {
			return err
		}
		s.DB = db
	}
	return nil
}

func newDB(name, dir string) (tmdb.DB, error) {
	return tmdb.NewGoLevelDB(name, dir)
}

// Start starts the service using the service fields as configuration parameters
func (s *Service) Start() error {
	if err := s.setDefaults(); err != nil {
		return err
	}

	errCh := make(chan error)
	{
		var err error
		switch s.Mode {
		case FullNode:
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()

			err = s.startFull(ctx, errCh)

		case Lite:
			err = s.startLite(errCh)
		}

		if err != nil {
			return err
		}
	}

	if s.RPC != nil {
		if err := s.startRPC(errCh); err != nil {
			return err
		}
	}

	err := <-errCh
	return err
}

func (s *Service) startFull(ctx context.Context, errCh chan error) error {
	cfg, err := abci.LoadConfig(s.HomeDir)
	if err != nil {
		return err
	}
	cfg.RPC.ListenAddress = s.LAddr

	app := abci.NewAppWithConfig(s.DB, cfg)
	opts := abci.NodeOptions{}

	if addr := s.RemoteSignerListener; addr != "" {
		listener, err := privval.NewSignerListener(addr, s.Logger.With("module", "privval"))
		if err != nil {
			return err
		}
		signer, err := privval.NewSignerClient(listener)
		if err != nil {
			return err
		}
		opts.PrivValidator = signer
	}

	srv, err := abci.StartInProcessServerWithNodeOptions(app, opts)
	if err != nil {
		return err
	}

	if err := s.startWitness(ctx, app); err != nil {
		return err
	}

	go func() {
		srv.Wait()
		errCh <- srv.Stop()
	}()

	return nil
}

func (s *Service) startWitness(ctx context.Context, app *abci.App) error {
	client, err := app.NewClient()
	if err != nil {
		return err
	}

	gen, err := abci.NewGenesisFromFile(app.Config.GenesisFile())
	if err != nil {
		return err
	}

	ethOpts := witness.DefaultEthereumProviderOpts
	ethOpts.SnapshotBlock = gen.SnapshotBlock
	p, err := witness.NewEthereumProviderWithOpts(s.WEB3, ethOpts)
	if err != nil {
		return err
	}

	opts := witness.DefaultOptions
	opts.PeriodLimit = int(gen.ConsensusParams.PeriodLimit)
	opts.PeriodLength = int(gen.ConsensusParams.PeriodLength)
	w := witness.New(client, p, opts)
	return w.WithLogger(s.Logger).Start(ctx)
}

func (s *Service) startLite(errCh chan error) error {
	if s.FullNode == "" {
		return errors.New(".FullNode can't be empty")
	}

	lite, err := abci.NewLite(s.FullNode)
	if err != nil {
		return err
	}

	logger := s.Logger.With("module", "rpc")
	go func() {
		errCh <- proxy.StartProxy(*lite, s.LAddr, logger, 99)
	}()

	return nil
}

func (s *Service) startRPC(errCh chan error) error {
	key, err := abci.LoadPrivateKey(s.HomeDir)
	if err != nil {
		return err
	}

	newClient := func() (*abci.Client, error) {
		return abci.NewHTTPClient(s.LAddr, key)
	}

	srv, err := rpc.NewServer(newClient)
	if err != nil {
		return err
	}

	logger := s.Logger.With("module", "jsonrpc")

	opts := s.RPC
	if port := opts.HTTPPort; port != 0 {
		bind := fmt.Sprintf(":%d", port)
		go func() {
			logger.Info("Starting HTTP server", "bind", bind)
			errCh <- http.ListenAndServe(bind, srv)
		}()
	}

	if port := opts.WSPort; port != 0 {
		bind := fmt.Sprintf(":%d", port)
		go func() {
			logger.Info("Starting WS server", "bind", bind)
			errCh <- http.ListenAndServe(bind, srv.WebsocketHandler([]string{"*"}))
		}()
	}

	return nil
}
