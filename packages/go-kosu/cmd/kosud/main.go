package main

import (
	"context"
	"fmt"
	stdlog "log"
	"os"
	"os/user"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/spf13/cobra"
	tmlog "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/lite/proxy"
	db "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/rpc"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/version"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/witness"
)

const (
	dbName = "kosu"
)

// Config holds the program execution arguments
type Config struct {
	Home         string
	Web3         string
	LiteFullnode string
	LAddr        string
	Debug        bool
	RPC          bool
	Lite         bool
}

func newDB(dir string) (db.DB, error) {
	gdb, err := db.NewGoLevelDB(dbName, dir)
	if err != nil {
		return nil, err
	}

	return gdb, nil
}

func startWitness(ctx context.Context, app *abci.App, ethAddr string, logger tmlog.Logger) error {
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
	p, err := witness.NewEthereumProviderWithOpts(ethAddr, ethOpts)
	if err != nil {
		return err
	}

	opts := witness.DefaultOptions
	opts.PeriodLimit = int(gen.ConsensusParams.PeriodLimit)
	opts.PeriodLength = int(gen.ConsensusParams.PeriodLength)
	w := witness.New(client, p, opts)
	return w.WithLogger(logger).Start(ctx)
}

func startRPCServer(cfg *Config, client *abci.Client, rpcArgs *rpc.ServerArgs, logger tmlog.Logger) error {
	if !cfg.RPC {
		return nil
	}

	return rpcArgs.StartServer(client, logger, nil)
}

func start(cfg *Config, rpcArgs *rpc.ServerArgs) error {
	var client *abci.Client
	var logger tmlog.Logger
	done := make(chan error)

	// Load the Kosu config and update the listening address
	conf, err := abci.LoadConfig(cfg.Home)
	if err != nil {
		return err
	}
	if addr := cfg.LAddr; addr != "" {
		conf.RPC.ListenAddress = addr
	}

	if !cfg.Lite {
		// starts the fullnode
		db, err := newDB(cfg.Home)
		if err != nil {
			return err
		}
		app := abci.NewAppWithConfig(db, conf)
		logger, err = abci.NewLogger(conf)
		if err != nil {
			return err
		}

		srv, err := abci.StartInProcessServer(app)
		if err != nil {
			return err
		}

		ctx, cancel := context.WithCancel(context.Background())
		defer cancel()

		if err := startWitness(ctx, app, cfg.Web3, logger); err != nil {
			return err
		}

		client, err = app.NewClient()
		if err != nil {
			return err
		}

		// Wait for the server to finish and signal it
		go func() {
			srv.Wait()
			done <- srv.Stop()
		}()

	} else {
		logger = tmlog.NewTMLogger(os.Stdout)

		// start the lite node
		lite, err := abci.NewLite(cfg.LiteFullnode)
		if err != nil {
			return err
		}
		addr := conf.RPC.ListenAddress

		// We start a proxy using the lite client and
		// an abci.Client that connects to the proxy
		go func() {
			err := proxy.StartProxy(*lite, addr, logger.With("module", "rpc"), 99)
			done <- err
		}()

		time.Sleep(1 * time.Second)
		client, err = abci.NewHTTPClient(addr, nil)
		if err != nil {
			return err
		}
	}

	if err := startRPCServer(cfg, client, rpcArgs, logger); err != nil {
		return err
	}

	err = <-done
	return err
}

func main() {
	var (
		cfg Config
	)

	cobra.OnInitialize(func() {
		cfg.Home = expandPath(cfg.Home)
	})

	startCmd := &cobra.Command{
		Use:   "start",
		Short: "Starts the kosu node",
		Long:  "Main entrypoint for Kosu validators and full nodes.\nPrior to use, 'kosud init' must be run.",
	}

	startCmd.Flags().StringVarP(&cfg.LAddr, "laddr", "", "tcp://localhost:26657", "Serve on a given address")
	startCmd.Flags().StringVarP(&cfg.Web3, "web3", "E", "ws://localhost:8546", "URL of an Ethereum JSONRPC provider")
	startCmd.Flags().BoolVarP(&cfg.RPC, "rpc", "", false, "Start the JSON-RPC API")
	startCmd.Flags().BoolVarP(&cfg.Lite, "lite", "", false, "Start the node as a Lite client")
	startCmd.Flags().StringVarP(&cfg.LiteFullnode, "lite-fullnode", "", "http://localhost:26657", "Fullnode's endpoint (required when running with --lite)")
	rpcArgs := rpc.RegisterServerArgs("rpc", startCmd)
	startCmd.PreRunE = func(cmd *cobra.Command, args []string) error {
		if cfg.RPC {
			return rpcArgs.Validate()
		}
		return nil
	}

	startCmd.Run = func(cmd *cobra.Command, args []string) {
		if err := start(&cfg, rpcArgs); err != nil {
			stdlog.Fatal(err)
		}
	}

	initCmd := &cobra.Command{
		Use:   "init",
		Short: "Initialize a home directory and configuration",
		Long: "Generates a Tendermint configuration directory and key pair for a Kosu node.\n" +
			"The default home directory is '$HOME/.kosu', which can be overridden with the '--home' flag.",
		Run: func(cmd *cobra.Command, args []string) {
			if err := abci.InitTendermint(cfg.Home); err != nil {
				stdlog.Fatal(err)
			}
		},
	}

	nodeCmd := &cobra.Command{
		Use:   "node",
		Short: "Node related operations",
	}
	nodeCmd.AddCommand(
		&cobra.Command{
			Use:   "info",
			Short: "Show this node's information",
			Long:  "Displays information unique to this node",
			RunE: func(cmd *cobra.Command, _ []string) error {
				kosuCfg, err := abci.LoadConfig(cfg.Home)
				if err != nil {
					return err
				}

				info, err := abci.ShowNodeInfo(kosuCfg)
				if err != nil {
					return err
				}

				fmt.Printf("Public Key: %s\n", info.PublicKey)
				fmt.Printf("Node ID:    %s\n", info.NodeID)
				fmt.Printf("Peer ID:    %s\n", info.PeerID)
				fmt.Printf("Moniker:    %s\n", info.Moniker)
				return nil
			},
		},
		&cobra.Command{
			Use:   "reset",
			Short: "Reset this node to genesis state",
			Long:  "Reset will wipe all the data and WAL, keeping only the config and the genesis file",
			RunE: func(cmd *cobra.Command, _ []string) error {
				kosuCfg, err := abci.LoadConfig(cfg.Home)
				if err != nil {
					return err
				}

				abci.ResetAll(kosuCfg, os.Stdout)

				dbdir := path.Join(kosuCfg.RootDir, dbName+".db")
				return os.RemoveAll(dbdir)
			},
		},
	)
	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "The Kosud node",
	}

	rootCmd.PersistentFlags().StringVarP(&cfg.Home, "home", "H", "~/.kosu", "directory for config and data")
	rootCmd.PersistentFlags().BoolVarP(&cfg.Debug, "debug", "d", false, "enable debuging")
	rootCmd.AddCommand(
		initCmd,
		startCmd,
		nodeCmd,
		version.NewCommand(),
	)

	if err := rootCmd.Execute(); err != nil {
		stdlog.Fatal(err)
	}
}

func expandPath(path string) string {
	usr, err := user.Current()
	if err != nil {
		return path
	}

	if path == "~" {
		return usr.HomeDir
	} else if strings.HasPrefix(path, "~/") {
		return filepath.Join(usr.HomeDir, path[2:])
	}

	return path
}
