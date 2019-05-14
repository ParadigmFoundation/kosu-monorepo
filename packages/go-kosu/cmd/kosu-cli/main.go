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
)

func main() {
	var client abci.Client

	rootCmd := &cobra.Command{
		Use:   "kosu-cli",
		Short: "kosu console client",
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
		client = *abci.NewHTTPClient(addr, key)
		return nil
	}

	abci := cli.New(&client)
	rootCmd.AddCommand(
		abci.RebalanceTx(),
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
