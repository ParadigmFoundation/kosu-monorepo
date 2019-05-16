package main

import (
	"context"
	"log"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"github.com/tendermint/tendermint/libs/db"

	"go-kosu/abci"
	"go-kosu/store"
	"go-kosu/witness"
)

const (
	ethAddr  = "wss://ropsten.infura.io/ws"
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

func startWitness(ctx context.Context, ethAddr string, nodeAddr string, key []byte) error {
	client := abci.NewHTTPClient(nodeAddr, key)
	p, err := witness.NewEthereumProvider(ethAddr)

	if err != nil {
		return err
	}

	w := witness.New(client, p, witness.DefaultOptions)
	return w.Start(ctx)
}

func run(cfg *Config, key []byte) error {
	db, err := newDB(cfg.Home, cfg.Debug)
	if err != nil {
		return err
	}

	app := abci.NewApp(store.NewState(), db, cfg.Home)
	srv, err := abci.StartInProcessServer(app)
	if err != nil {
		return err
	}
	// TODO, call defer srv.Stop() ?

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := startWitness(ctx, ethAddr, nodeAddr, key); err != nil {
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

	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "Starts the kosu node",
		Run: func(cmd *cobra.Command, args []string) {
			if err := run(&cfg, key); err != nil {
				log.Fatal(err)
			}
		},
	}
	rootCmd.Flags().StringVar(&cfg.Home, "home", "~/.kosu", "directory for config and data")
	rootCmd.Flags().BoolVar(&cfg.Debug, "debug", false, "enable debuging")
	rootCmd.Flags().StringVar(&cfg.Web3, "web3", "wss://ropsten.infura.ws", "web3 provider URL")
	rootCmd.Flags().BoolVar(&cfg.Init, "init", false, "initializes directory like 'tendermint init' does")

	cobra.OnInitialize(func() {
		cfg.Home = expandPath(cfg.Home)
		if cfg.Init {
			if err := abci.InitTendermint(cfg.Home); err != nil {
				log.Fatal(err)
			}
		}

		var err error
		key, err = abci.LoadPrivateKey(cfg.Home)
		if err != nil {
			log.Fatal(err)
		}
	})

	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
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
