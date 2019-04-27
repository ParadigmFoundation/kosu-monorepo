package main

import (
	"encoding/hex"
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"paradigmcore/abci"
	"paradigmcore/abci/cli"
	"paradigmcore/abci/types"
)

func main() {
	var client abci.Client

	_, privKey, err := types.NewKeyPair()
	if err != nil {
		panic(err)
	}

	rootCmd := &cobra.Command{
		Use:   "kosu-cli",
		Short: "kosu console client",
	}
	rootCmd.PersistentFlags().String("abci", "http://localhost:26657", "ABCI server url")
	rootCmd.PersistentFlags().String("key", hex.EncodeToString(privKey), "Private key")
	rootCmd.PersistentPreRunE = func(cmd *cobra.Command, args []string) error {
		key := cmd.Flag("key").Value.String()
		dec, err := hex.DecodeString(key)
		if err != nil {
			return err
		}

		addr := cmd.Flag("abci").Value.String()

		// update the client
		client = *abci.NewHTTPClient(addr, dec)
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
