package main

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/ethereum/go-ethereum/rpc"
)

func main() {
	N := 90
	I := 10
	for i := 0; i < I; i++ {
		fmt.Printf("\n#%d ", i+1)
		startAndWait(N)
	}
}

func startAndWait(N int) {
	fmt.Printf("Starting %d instances\n", N)
	wg := sync.WaitGroup{}

	for i := 0; i < N; i++ {
		wg.Add(1)
		go subscribe(i, &wg)
	}

	time.Sleep(1 * time.Second)
	fmt.Printf("Waiting them to finish\n")
	wg.Wait()
	fmt.Printf("All instances done!\n")

}

func subscribe(id int, wg *sync.WaitGroup) {
	defer wg.Done()

	cl, err := rpc.DialWebsocket(context.Background(), "ws://localhost:14342", "*")
	if err != nil {
		panic(err)
	}
	defer cl.Close()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ch := make(chan interface{})
	defer close(ch)

	sub, err := cl.Subscribe(ctx, "kosu", ch, "newBlocks")
	if err != nil {
		panic(err)
	}
	defer sub.Unsubscribe()

	for i := 0; i < 5; i++ {
		select {
		case <-time.After(1 * time.Second):
		case _, ok := <-ch:
			if !ok {
				return
			}
		}
	}
}
