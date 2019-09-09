package cli

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"strconv"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"

	"github.com/spf13/cobra"
)

// CLI provides functions to build a cli client
type CLI struct {
	client *abci.Client
}

// New returns a new CLI instance
func New(c *abci.Client) *CLI {
	return &CLI{client: c}
}

func printAndExit(msg string, args ...interface{}) {
	fmt.Printf(msg, args...)
	os.Exit(1)
}

// RebalanceTx is the CLI command for sending a Rebalance transaction
func (cli *CLI) RebalanceTx() *cobra.Command {
	return &cobra.Command{
		Use:   "rebalance <number> <period start> <period end>",
		Short: "updates the round info number",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			info := types.RoundInfo{}
			values := []*uint64{&info.Number, &info.StartsAt, &info.EndsAt}
			for i := 0; i < len(values); i++ {
				num, err := strconv.ParseUint(args[i], 10, 64)
				if err != nil {
					return err
				}
				*values[i] = num
			}

			tx := &types.TransactionRebalance{
				RoundInfo: &info,
			}

			res, err := cli.client.BroadcastTxCommit(tx)
			if err != nil {
				printAndExit("%v\n", err)
			}

			if res.CheckTx.IsErr() {
				printAndExit("check tx: %s\n", res.CheckTx.Log)
			}

			if res.DeliverTx.IsErr() {
				printAndExit("deliver tx: %s\n", res.DeliverTx.Info)
			}

			fmt.Printf("ok: < %s>\n", tx.RoundInfo)
			return nil
		},
	}
}

// UpdateValidators updates the validator set by sending a Validator's WitnessTx
func (cli *CLI) UpdateValidators() *cobra.Command {
	return &cobra.Command{
		Use:   "update-validator <block> <pubkey> <address> <power>",
		Short: "update validators by sending a WitnessTx",
		Long:  "pubkey needs to be encoded in base64. To remove a validator use power = 0",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) error {
			block, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			pubKey, err := base64.StdEncoding.DecodeString(args[1])
			if err != nil {
				return err
			}

			addr, amount := args[2], args[3]

			tx := &types.TransactionWitness{
				Subject:   types.TransactionWitness_VALIDATOR,
				Block:     block,
				PublicKey: pubKey,
				Address:   addr,
				Amount:    types.NewBigIntFromString(amount, 10),
			}

			res, err := cli.client.BroadcastTxCommit(tx)
			if err != nil {
				printAndExit("%v\n", err)
			}

			if res.CheckTx.IsErr() {
				printAndExit("check tx: %s\n", res.CheckTx.Log)
			}

			if res.DeliverTx.IsErr() {
				printAndExit("deliver tx: %s\n", res.DeliverTx.Info)
			}

			ch, closer, err := cli.client.Subscribe(context.Background(), "tm.event = 'NewBlock'")
			if err != nil {
				printAndExit("subscribe: %v", err)
			}
			defer closer()

			// wait for the next block
			<-ch

			set, err := cli.client.Validators(nil)
			if err != nil {
				printAndExit("validators: %v", err)
			}

			fmt.Println("New validator set")
			for _, v := range set.Validators {
				fmt.Printf("<%s power:%d>\n", v.PubKey.Address().String(), v.VotingPower)
			}
			return nil
		},
	}
}

// QueryRoundInfo queries the round info
func (cli *CLI) QueryRoundInfo() *cobra.Command {
	return &cobra.Command{
		Use:     "round",
		Aliases: []string{"r", "ri"},
		Short:   "Query Round Info",
		Args:    cobra.ExactArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			info, err := cli.client.QueryRoundInfo()
			if err != nil {
				printAndExit("%v\n", err)
			}

			fmt.Printf("ok: < %s>\n", info)
		},
	}
}

// QueryConsensusParams queries the consensus parameters
func (cli *CLI) QueryConsensusParams() *cobra.Command {
	return &cobra.Command{
		Use:     "consensus",
		Aliases: []string{"c", "cp"},
		Short:   "Query Consensus Parameters",
		Args:    cobra.ExactArgs(0),
		Run: func(cmd *cobra.Command, args []string) {
			params, err := cli.client.QueryConsensusParams()
			if err != nil {
				printAndExit("%v\n", err)
			}

			fmt.Printf("ok: < %s>\n", params)
		},
	}
}

// QueryPoster queries a poster
func (cli *CLI) QueryPoster() *cobra.Command {
	return &cobra.Command{
		Use:   "poster <address (0x..)>",
		Short: "Query a given Poster by its address",
		Args:  cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			poster, err := cli.client.QueryPoster(args[0])
			if err != nil {
				printAndExit("%v\n", err)
			}

			fmt.Printf("ok: < %s>\n", poster)
		},
	}
}
