package service

import (
	"log"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/rpc"
	"github.com/spf13/cobra"
)

// CommandConfig are the config parameter for the command
type CommandConfig struct {
	Home         string
	Web3         string
	LiteFullnode string
	LAddr        string
	RPC          bool
	Lite         bool
}

// RegisterCommand register flags and logic into a cobra command to start a node
func RegisterCommand(cmd *cobra.Command, homeFlag string) {
	cfg := &CommandConfig{}

	cmd.Flags().StringVarP(&cfg.LAddr, "laddr", "", "tcp://0.0.0.0:26657", "Serve on a given address")
	cmd.Flags().StringVarP(&cfg.Web3, "web3", "E", "ws://localhost:8546", "URL of an Ethereum JSONRPC provider")
	cmd.Flags().BoolVarP(&cfg.RPC, "rpc", "", false, "Start the JSON-RPC API")
	cmd.Flags().BoolVarP(&cfg.Lite, "lite", "", false, "Start the node as a Lite client")
	cmd.Flags().StringVarP(&cfg.LiteFullnode, "lite-fullnode", "", "http://localhost:26657",
		"Fullnode's endpoint (required when running with --lite)")
	rpcArgs := rpc.RegisterServerArgs("rpc", cmd)
	cmd.PreRunE = func(cmd *cobra.Command, args []string) error {
		if cfg.RPC {
			return rpcArgs.Validate()
		}
		return nil
	}

	cmd.Run = func(cmd *cobra.Command, args []string) {
		home, err := cmd.Flags().GetString(homeFlag)
		if err != nil {
			panic(err)
		}

		srv := Service{
			HomeDir: home,
			WEB3:    cfg.Web3,
			LAddr:   cfg.LAddr,
		}

		if cfg.Lite {
			srv.Mode = Lite
			srv.FullNode = cfg.LiteFullnode
		}

		if cfg.RPC {
			srv.RPC = &RPC{}
			if rpcArgs.HTTP {
				srv.RPC.HTTPPort = rpcArgs.HTTPPort
			}

			if rpcArgs.WS {
				srv.RPC.WSPort = rpcArgs.WSPort
			}
		}

		if err := srv.Start(); err != nil {
			log.Fatal(err)
		}
	}
}
