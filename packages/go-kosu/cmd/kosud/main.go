package main

import (
	"context"
	"fmt"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"go-kosu/store"
	"go-kosu/witness"
	"log"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"github.com/tendermint/tendermint/libs/db"
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
	Key   []byte
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
	w, err := witness.NewEthereumProvider(ethAddr)

	if err != nil {
		return err
	}

	return witness.Start(ctx, client, w)
}

func run(cfg *Config) error {
	if cfg.Init {
		abci.InitTendermint(cfg.Home)
	}

	db, err := newDB(cfg.Home, cfg.Debug)
	if err != nil {
		return err
	}

	app := abci.NewApp(store.NewState(), db, cfg.Home)
	srv, err := abci.StartInProcessServer(app)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	if err := startWitness(ctx, ethAddr, nodeAddr, cfg.Key); err != nil {
		return err
	}

	srv.Wait()
	return nil
}

func main() {
	cfg := Config{}

	_, key, err := types.NewKeyPair()
	if err != nil {
		fmt.Printf("%s", err)
		os.Exit(1)
	}

	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "Starts the kosu node",
		Run: func(cmd *cobra.Command, args []string) {
			if err := run(&cfg); err != nil {
				log.Fatal(err)
			}
		},
	}
	rootCmd.Flags().StringVar(&cfg.Home, "home", "~/.kosu", "directory for config and data")
	rootCmd.Flags().BoolVar(&cfg.Debug, "debug", false, "enable debuging")
	rootCmd.Flags().StringVar(&cfg.Web3, "web3", "wss://ropsten.infura.ws", "web3 provider URL")
	rootCmd.Flags().BytesHexVar(&cfg.Key, "key", key, "private key used to sign Witness requests")
	rootCmd.Flags().BoolVar(&cfg.Init, "init", false, "initializes directory like 'tendermint init' does")

	cobra.OnInitialize(func() {
		cfg.Home = expandPath(cfg.Home)
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
