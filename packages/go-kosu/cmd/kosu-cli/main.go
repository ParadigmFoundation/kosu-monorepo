package main

import (
	"encoding/hex"
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"

	"go-kosu/abci"
	"go-kosu/abci/cli"
	"go-kosu/version"
)

func main() {
	var client *abci.Client

	rootCmd := &cobra.Command{
		Use:     "kosu-cli",
		Short:   "kosu console client",
		Version: version.Version,
	}
	rootCmd.PersistentFlags().String("abci", "http://localhost:26657", "ABCI server url")
	rootCmd.PersistentFlags().String("home", "~/.kosu", "directory for config and data")
	rootCmd.PersistentFlags().String("key", "", "Private key. Overrides the private key loaded from --home dir")
	rootCmd.PersistentPreRunE = func(cmd *cobra.Command, args []string) error {
		var (
			err error
			key []byte
		)

		keyFlag := cmd.Flag("key")
		if keyFlag.Changed {
			val := keyFlag.Value.String()
			key, err = hex.DecodeString(val)
		} else {
			home := cmd.Flag("home").Value.String()
			key, err = abci.LoadPrivateKey(expandPath(home))
		}
		if err != nil {
			return err
		}

		addr := cmd.Flag("abci").Value.String()

		// update the client
		client, err = abci.NewHTTPClient(addr, key)
		return err
	}

	abci := cli.New(client)

	tx := &cobra.Command{
		Use:   "tx",
		Short: "execute transactions",
	}
	tx.AddCommand(
		abci.RebalanceTx(),
		abci.UpdateValidators(),
	)

	query := &cobra.Command{
		Use:   "query",
		Short: "query",
	}
	query.AddCommand(
		abci.QueryConsensusParams(),
		abci.QueryPoster(),
		abci.QueryRoundInfo(),
	)

	rootCmd.AddCommand(
		version.NewCommand(),
		tx,
		query,
	)

	if err := rootCmd.Execute(); err != nil {
		fmt.Printf("%+v", err)
		os.Exit(1)
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
