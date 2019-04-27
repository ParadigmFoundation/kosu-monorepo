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
		Use:   "rebalance [number]",
		Short: "updates the round info number",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			num, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			tx := &types.TransactionRebalance{
				RoundInfo: &types.RoundInfo{Number: num},
			}

			res, err := cli.client.BroadcastTxCommit(tx)
			if err != nil {
				return err
			}

			if res.CheckTx.IsErr() {
				fmt.Printf("check tx: %s\n", res.CheckTx.Info)
				os.Exit(1)
			}

			if res.DeliverTx.IsErr() {
				fmt.Printf("deliver tx: %s\n", res.DeliverTx.Info)
				os.Exit(1)
			}

			fmt.Printf("ok: new round info #%d\n", num)
			return nil
		},
	}
}
