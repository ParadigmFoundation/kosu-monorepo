package rpc

import (
	"errors"
	"fmt"
	"go-kosu/abci"
	"log"
	"net/http"
	"sync"

	"github.com/ethereum/go-ethereum/rpc"
	"github.com/spf13/cobra"
)

// NewCommand returns a new cobra.Command to be attached as a sub-command
func NewCommand() *cobra.Command {
	var (
		url string

		http     bool
		httpPort int

		ws     bool
		wsPort int

		key []byte
	)
	cmd := &cobra.Command{
		Use:   "rpc",
		Short: "starts the rpc bridge",
		Long:  "The RPC bridge exposes a set of kosud functionalities over JSON-RPC 2.0",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if !http && !ws {
				return errors.New("both `--ws` and `--http` where false, you need to enable at least one")
			}

			var homeDir string
			if home := cmd.Flag("home"); home == nil {
				homeDir = "~/kosu"
			} else {
				homeDir = home.Value.String()
			}

			var err error
			key, err = abci.LoadPrivateKey(homeDir)
			if err != nil {
				return err
			}

			return nil
		},
		Run: func(cmd *cobra.Command, args []string) {
			client := abci.NewHTTPClient(url, key)
			srv := NewServer(client)

			wg := sync.WaitGroup{}
			if http {
				wg.Add(1)
				go func() {
					defer wg.Done()
					if err := startHTTP(srv, httpPort); err != nil {
						log.Printf("http: %s", err)
					}
				}()
			}

			if ws {
				wg.Add(1)
				go func() {
					defer wg.Done()
					if err := startWS(srv, wsPort); err != nil {
						log.Printf("ws: %s", err)
					}
				}()
			}
			wg.Wait()
		},
	}

	cmd.Flags().StringVar(&url, "url", "http://localhost:26657", "URL exposed by kosud")
	cmd.Flags().BoolVar(&http, "http", true, "Starts the HTTP server")
	cmd.Flags().IntVar(&httpPort, "http-port", 14341, "HTTP server listening port")

	cmd.Flags().BoolVar(&ws, "ws", true, "Starts the WebSocket server")
	cmd.Flags().IntVar(&wsPort, "ws-port", 14342, "WebSocket server listening port")

	return cmd
}

func startHTTP(srv *rpc.Server, port int) error {
	bind := fmt.Sprintf(":%d", port)
	log.Printf("Starting HTTP server on %s", bind)
	return http.ListenAndServe(bind, srv)
}

func startWS(srv *rpc.Server, port int) error {
	bind := fmt.Sprintf(":%d", port)
	log.Printf("Starting WS server on %s", bind)

	return http.ListenAndServe(
		bind,
		srv.WebsocketHandler([]string{"*"}),
	)
}
