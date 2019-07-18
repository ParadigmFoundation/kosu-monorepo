package rpc

import (
	"context"

	"github.com/ethereum/go-ethereum/rpc"
)

type Client struct {
	rpc *rpc.Client
}

func DialInProc(srv *rpc.Server) *Client {
	return &Client{
		rpc: rpc.DialInProc(srv),
	}
}

func (c *Client) Subscribe(ctx context.Context, fn func(interface{}), query string) error {
	ch := make(chan interface{})
	args := []interface{}{"subscribe", query}
	sub, err := c.rpc.Subscribe(ctx, "kosu", ch, args...)
	if err != nil {
		return err
	}

	go func() {
		defer close(ch)
		defer sub.Unsubscribe()

		for {
			select {
			case <-ctx.Done():
				return
			case <-sub.Err():
				return
			case i := <-ch:
				fn(i)
			}
		}
	}()
	return nil
}

func (c *Client) Call(result interface{}, method string, args ...interface{}) error {
	return c.rpc.Call(result, method, args...)
}
