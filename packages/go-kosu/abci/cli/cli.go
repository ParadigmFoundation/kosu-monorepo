package cli

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"path"
	"strconv"

	"github.com/spf13/cobra"

	"github.com/tendermint/tendermint/abci/server"
	"github.com/tendermint/tendermint/config"
	dbm "github.com/tendermint/tm-db"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/service"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
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

// QueryLatestOrders queries the latest orders
func (cli *CLI) QueryLatestOrders() *cobra.Command {
	return &cobra.Command{
		Use:   "latest-orders",
		Short: "Query the latest orders",
		Run: func(cmd *cobra.Command, _ []string) {
			txs, err := cli.client.QueryLatestOrders()
			if err != nil {
				printAndExit("%v\n", err)
			}

			for _, tx := range txs {
				order, err := store.NewOrderFromProto(&tx)
				if err != nil {
					printAndExit("%v\n", err)
				}
				fmt.Println(order)
			}
		},
	}
}

// NewInitCommand returns the init command
func NewInitCommand(homeFlag string) *cobra.Command {
	return &cobra.Command{
		Use:   "init",
		Short: "Initialize a home directory and configuration",
		Long: "Generates a Tendermint configuration directory and key pair for a Kosu node.\n" +
			"The default home directory is '$HOME/.kosu', which can be overridden with the '--home' flag.",
		RunE: func(cmd *cobra.Command, args []string) error {
			home, err := cmd.Flags().GetString(homeFlag)
			if err != nil {
				return err
			}

			return abci.InitTendermint(home)
		},
	}
}

func getCmdCfg(cmd *cobra.Command, homeFlag string) (*config.Config, error) {
	home, err := cmd.Flags().GetString(homeFlag)
	if err != nil {
		return nil, err
	}
	return abci.LoadConfig(home)
}

// NewNodeCommand returns the node command
func NewNodeCommand(homeFlag string) *cobra.Command {
	info := &cobra.Command{
		Use:   "info",
		Short: "Show this node's information",
		Long:  "Displays information unique to this node",
		RunE: func(cmd *cobra.Command, _ []string) error {
			cfg, err := getCmdCfg(cmd, homeFlag)
			if err != nil {
				return err
			}

			info, err := abci.ShowNodeInfo(cfg)
			if err != nil {
				return err
			}

			fmt.Printf("Public Key: %s\n", info.PublicKey)
			fmt.Printf("Node ID:    %s\n", info.NodeID)
			fmt.Printf("Peer ID:    %s\n", info.PeerID)
			fmt.Printf("Moniker:    %s\n", info.Moniker)
			return nil
		},
	}

	reset := &cobra.Command{
		Use:   "reset",
		Short: "Reset this node to genesis state",
		Long:  "Reset will wipe all the data and WAL, keeping only the config and the genesis file",
		RunE: func(cmd *cobra.Command, _ []string) error {
			cfg, err := getCmdCfg(cmd, homeFlag)
			if err != nil {
				return err
			}

			abci.ResetAll(cfg, os.Stdout)
			dbdir := path.Join(cfg.RootDir, "kosu.db")
			return os.RemoveAll(dbdir)
		},
	}

	cmd := &cobra.Command{
		Use:   "node",
		Short: "Node related operations",
	}
	cmd.AddCommand(info, reset)
	return cmd
}

// NewStartCommand returns the start command
func NewStartCommand(homeFlag string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "start",
		Short: "Starts the kosu node",
		Long:  "Main entrypoint for Kosu validators and full nodes.\nPrior to use, 'kosud init' must be run.",
	}
	service.RegisterCommand(cmd, homeFlag)
	return cmd
}

func newApp(home string) (*abci.App, error) {
	db, err := dbm.NewGoLevelDB("kosu", home)
	if err != nil {
		return nil, err
	}

	return abci.NewApp(db, home), nil
}

// NewABCICommand returns the ABCI command
func NewABCICommand(homeFlag string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "abci",
		Short: "Starts kosu as a ABCI app",
		Long: "Starts kosu as a ABCI app.\nNote the `abci` command can only run in fullnode mode. " +
			"If you want you run in validator or lite more use `kosud start`",
		RunE: func(cmd *cobra.Command, _ []string) error {
			home, err := cmd.Flags().GetString(homeFlag)
			if err != nil {
				return err
			}

			app, err := newApp(home)
			if err != nil {
				log.Fatal(err)
			}

			logger, err := abci.NewLogger(app.Config)
			if err != nil {
				log.Fatal(err)
			}
			logger = logger.With("module", "app")

			srv, err := server.NewServer("tcp://127.0.0.1:26658", "socket", app)
			if err != nil {
				log.Fatal(err)
			}
			logger.Info("ABCI app started")

			if err := srv.Start(); err != nil {
				log.Fatal(err)
			}

			select {}
		},
	}

	return cmd
}
