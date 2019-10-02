package rpc

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/ethereum/go-ethereum/rpc"
	"github.com/spf13/cobra"
	tmlog "github.com/tendermint/tendermint/libs/log"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
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

// StartServer starts RPC Server endpoints WS and HTTP if defined
func (args *ServerArgs) StartServer(client *abci.Client, logger tmlog.Logger, errCh chan<- error) error {
	fn := func() (*abci.Client, error) { return client, nil }
	srv, err := NewServer(fn)
	if err != nil {
		return err
	}

	logger = logger.With("module", "jsonrpc")

	if args.HTTP {
		go func() {
			if err := startHTTP(srv, args.HTTPPort, logger); err != nil {
				logger.Error("HTTP", "err", err)
				if errCh != nil {
					errCh <- err
				}
			}
		}()
	}

	if args.WS {
		go func() {
			if err := startWS(srv, args.WSPort, logger); err != nil {
				logger.Error("WS", "err", err)
				if errCh != nil {
					errCh <- err
				}
			}
		}()
	}

	return nil
}

func startHTTP(srv *rpc.Server, port int, logger tmlog.Logger) error {
	bind := fmt.Sprintf(":%d", port)
	logger.Info("Starting HTTP server", "bind", bind)
	return http.ListenAndServe(bind, srv)
}

func startWS(srv *rpc.Server, port int, logger tmlog.Logger) error {
	bind := fmt.Sprintf(":%d", port)
	logger.Info("Starting WS server", "bind", bind)

	return http.ListenAndServe(
		bind,
		srv.WebsocketHandler([]string{"*"}),
	)
}
