package rpc

import (
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

// RegisterServerArgs will set the necessary flags to setup a RPC Server.
// The flags will be prefixed with the prefix string
// RegisterServerArgs returns a *ServerArgs object which can be used to start the RPC Server.
func RegisterServerArgs(prefix string, cmd *cobra.Command) *ServerArgs {
	args := &ServerArgs{prefix: prefix}

	flag := func(flag string) string {
		return strings.Join([]string{prefix, flag}, "-")
	}

	cmd.Flags().BoolVar(&args.HTTP, flag("http"), true, "Starts the HTTP server")
	cmd.Flags().IntVar(&args.HTTPPort, flag("http-port"), 14341, "HTTP server listening port")

	cmd.Flags().BoolVar(&args.WS, flag("ws"), true, "Starts the WebSocket server")
	cmd.Flags().IntVar(&args.WSPort, flag("ws-port"), 14342, "WebSocket server listening port")

	return args
}

// ServerArgs contains the parameters required to start the RPC Server
type ServerArgs struct {
	prefix string

	HTTPPort int
	WSPort   int
	HTTP     bool
	WS       bool
}

// Validate validates that all the parameters are valid
func (args *ServerArgs) Validate() error {
	if !args.HTTP && !args.WS {
		return fmt.Errorf("both `--%s-ws` and `--%s-http` where false, you need to enable at least one",
			args.prefix, args.prefix)
	}
	return nil
}
