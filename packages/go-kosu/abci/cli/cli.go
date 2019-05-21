package cli

import (
	"fmt"
	"go-kosu/abci"
	"go-kosu/abci/types"
	"os"
	"strconv"

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
				printAndExit("deliver tx: %s\n", res.DeliverTx.Log)
			}

			fmt.Printf("ok: < %s>\n", tx.RoundInfo)
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
