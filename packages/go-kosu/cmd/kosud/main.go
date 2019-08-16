package main

import (
	"context"
	stdlog "log"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"github.com/tendermint/tendermint/libs/db"
	"github.com/tendermint/tendermint/libs/log"

	"go-kosu/abci"
	"go-kosu/rpc"
	"go-kosu/witness"
)

const (
	nodeAddr = "tcp://0.0.0.0:26657"
)

// Config holds the program execution arguments
type Config struct {
	Home  string
	Debug bool
	Init  bool
	Web3  string
}

func newDB(dir string, debug bool) (db.DB, error) {
	gdb, err := db.NewGoLevelDB("kosu", dir)
	if err != nil {
		return nil, err
	}

	if debug {
		return db.NewDebugDB("db", gdb), nil
	}

	return gdb, nil
}

func startWitness(ctx context.Context, ethAddr string, nodeAddr string, key []byte, logger log.Logger) error {
	client, err := abci.NewHTTPClient(nodeAddr, key)
	if err != nil {
		return nil
	}

	p, err := witness.NewEthereumProvider(ethAddr)
	if err != nil {
		return err
	}

	w := witness.New(client, p, witness.DefaultOptions)
	return w.WithLogger(logger).Start(ctx)
}

func run(cfg *Config, key []byte) error {
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

	if err := startWitness(ctx, cfg.Web3, nodeAddr, key, logger); err != nil {
		return err
	}

	srv.Wait()
	return nil
}

func main() {
	var (
		cfg Config
		key []byte
	)

	cobra.OnInitialize(func() {
		cfg.Home = expandPath(cfg.Home)
	})

	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "Starts the kosu node",
		Long:  "Main entrypoint for Kosu validators and full nodes.\nPrior to use, 'kosud init' must be run.",
		Run: func(cmd *cobra.Command, args []string) {
			var err error
			key, err = abci.LoadPrivateKey(cfg.Home)
			if err != nil {
				stdlog.Fatal(err)
			}

			if err = run(&cfg, key); err != nil {
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

	rootCmd.PersistentFlags().StringVarP(&cfg.Home, "home", "H", "~/.kosu", "directory for config and data")
	rootCmd.PersistentFlags().BoolVarP(&cfg.Debug, "debug", "d", false, "enable debuging")
	rootCmd.Flags().StringVarP(&cfg.Web3, "web3", "E", "ws://localhost:8546", "URL of an Ethereum JSONRPC provider")

	rootCmd.AddCommand(rpc.NewCommand())
	rootCmd.AddCommand(initCmd)

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
