package main

import (
	"fmt"
	"log"
	"net/http"
	"runtime"
	"time"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/rpc"
)

func main() {
	fn := func() (*abci.Client, error) { return abci.NewHTTPClient("localhost:26657", nil) }
	srv, err := rpc.NewServer(fn)
	if err != nil {
		log.Fatal(err)
	}

	// collect and print MemStats each 1 second
	go func() {
		for {
			time.Sleep(1 * time.Second)
			stats := runtime.MemStats{}
			runtime.ReadMemStats(&stats)
			fmt.Printf("HeapAlloc: %dK, HeapIdle: %dK, HeapObjects: %dK\n",
				stats.HeapAlloc/1024, stats.HeapIdle/1024, stats.HeapObjects/1024,
			)
		}
	}()

	http.ListenAndServe(":14342", srv.WebsocketHandler([]string{"*"}))
}
