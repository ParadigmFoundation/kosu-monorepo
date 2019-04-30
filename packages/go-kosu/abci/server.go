package abci

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/tendermint/tendermint/node"
)

// Server wraps a tendermint node
type Server struct {
	node *node.Node
}

// StartInProcessServer starts an InProcess ABCI app and server
func StartInProcessServer(app *App) (*Server, error) {
	tm, err := app.CreateNode()
	if err != nil {
		return nil, err
	}

	srv := &Server{node: tm}
	if err := srv.start(); err != nil {
		return nil, err
	}

	return srv, nil
}

func (s *Server) start() error {
	// Stop upon receiving SIGTERM or CTRL-C
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	go func() {
		for sig := range c {
			fmt.Printf("captured %v, exiting...", sig)
			if s.node.IsRunning() {
				if err := s.node.Stop(); err != nil {
					fmt.Fprintf(os.Stderr, "stop: %+v", err)
				}
			}
			os.Exit(1)
		}
	}()

	if err := s.node.Start(); err != nil {
		return err
	}

	return nil
}

// Wait blocks until the server has been stopped
func (s *Server) Wait() { s.node.Wait() }

// Stop stops the server
func (s *Server) Stop() error { return s.node.Stop() }
