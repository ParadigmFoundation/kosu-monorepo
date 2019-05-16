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
				fmt.Printf("%v\n", err)
				os.Exit(1)
			}

			if res.CheckTx.IsErr() {
				fmt.Printf("check tx: %s\n", res.CheckTx.Info)
				os.Exit(1)
			}

			if res.DeliverTx.IsErr() {
				fmt.Printf("deliver tx: %s\n", res.DeliverTx.Info)
				os.Exit(1)
			}

			fmt.Printf("ok: new round info #%v\n", tx.RoundInfo)
			return nil
		},
	}
}
