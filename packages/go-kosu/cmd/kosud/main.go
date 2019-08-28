package main

import (
	"context"
	"fmt"
	stdlog "log"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"

	"go-kosu/abci"
	"go-kosu/rpc"
	"go-kosu/version"
	"go-kosu/witness"
)

const (
	dbName   = "kosu"
)

// Config holds the program execution arguments
type Config struct {
	Home  string
	Debug bool
	Init  bool
	Web3  string
}

func newDB(dir string, debug bool) (db.DB, error) {
	gdb, err := db.NewGoLevelDB(dbName, dir)
	if err != nil {
		return nil, err
	}

	if debug {
		return db.NewDebugDB("db", gdb), nil
	}

	return gdb, nil
}

func startWitness(ctx context.Context, app *abci.App, ethAddr string, logger log.Logger) error {
	client, err := app.NewClient()
	if err != nil {
		return err
	}

	p, err := witness.NewEthereumProvider(ethAddr)
	if err != nil {
		return err
	}

	gen, err := abci.NewGenesisFromFile(app.Config.GenesisFile())
	if err != nil {
		return err
	}

	opts := witness.DefaultOptions
	opts.PeriodLimit = int(gen.ConsensusParams.PeriodLimit)
	opts.PeriodLength = int(gen.ConsensusParams.PeriodLength)
	w := witness.New(client, p, opts)
	return w.WithLogger(logger).Start(ctx)
}

func run(cfg *Config) error {
	db, err := newDB(cfg.Home, cfg.Debug)
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

	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "Starts the kosu node",
		Long:  "Main entrypoint for Kosu validators and full nodes.\nPrior to use, 'kosud init' must be run.",
		Run: func(cmd *cobra.Command, args []string) {
			if err := run(&cfg); err != nil {
				stdlog.Fatal(err)
			}
		},
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

	showNodeInfoCmd := &cobra.Command{
		Use:   "show_node_info",
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
	}

	unsafeResetCmd := &cobra.Command{
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
	}

	rootCmd.PersistentFlags().StringVarP(&cfg.Home, "home", "H", "~/.kosu", "directory for config and data")
	rootCmd.PersistentFlags().BoolVarP(&cfg.Debug, "debug", "d", false, "enable debuging")
	rootCmd.Flags().StringVarP(&cfg.Web3, "web3", "E", "ws://localhost:8546", "URL of an Ethereum JSONRPC provider")

	rootCmd.AddCommand(
		version.NewCommand(),
		rpc.NewCommand(),
		initCmd,
		showNodeInfoCmd,
		unsafeResetCmd,
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
