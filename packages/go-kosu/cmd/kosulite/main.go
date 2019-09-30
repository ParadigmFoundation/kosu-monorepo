package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	tmlog "github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/lite/proxy"
)

func main() {
	flag.Parse()
	chainID := flag.Arg(0)
	if chainID == "" {
		fmt.Printf("Usage: kosulite <chain-id>")
	}

	fmt.Printf("starting...\n")
	sc, err := abci.NewLite(chainID, "localhost:26657")
	if err != nil {
		panic(err)
	}

	if err := proxy.StartProxy(*sc, "tcp://localhost:9999", tmlog.NewTMLogger(os.Stdout), 99); err != nil {
		log.Printf("err = %+v\n", err)
	}

}
