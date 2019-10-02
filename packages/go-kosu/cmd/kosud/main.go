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

	"github.com/spf13/cobra"
	"github.com/tendermint/tendermint/libs/log"
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
	Home  string
	Web3  string
	Debug bool
	RPC   bool
}

func newDB(dir string) (db.DB, error) {
	gdb, err := db.NewGoLevelDB(dbName, dir)
	if err != nil {
		return nil, err
	}

	return gdb, nil
}

func startWitness(ctx context.Context, app *abci.App, ethAddr string, logger log.Logger) error {
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

func startRPCServer(cfg *Config, app *abci.App, rpcArgs *rpc.ServerArgs, logger log.Logger) error {
	if !cfg.RPC {
		return nil
	}

	client, err := app.NewClient()
	if err != nil {
		return err
	}

	return rpcArgs.StartServer(client, logger, nil)
}

func start(cfg *Config, rpcArgs *rpc.ServerArgs) error {
	db, err := newDB(cfg.Home)
	if err != nil {
		return err
	}

	app := abci.NewApp(db, cfg.Home)
	srv, err := abci.StartInProcessServer(app)
	if err != nil {
		return err
	}
	logger, err := abci.NewLogger(app.Config)
	if err != nil {
		return err
	}

	// TODO, call defer srv.Stop() ?

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := startWitness(ctx, app, cfg.Web3, logger); err != nil {
		return err
	}

	if err := startRPCServer(cfg, app, rpcArgs, logger); err != nil {
		return err
	}

	srv.Wait()
	return nil
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
	startCmd.Flags().StringVarP(&cfg.Web3, "web3", "E", "ws://localhost:8546", "URL of an Ethereum JSONRPC provider")
	startCmd.Flags().BoolVarP(&cfg.RPC, "rpc", "", false, "Start the JSON-RPC API")
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
