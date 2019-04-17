package main

import (
	"log"
	"os"
	"go-kuso/abci"
	"go-kuso/store"

	"github.com/tendermint/tendermint/libs/db"
)

func newDB(dir string, debug bool) (db.DB, error) {
	gdb, err := db.NewGoLevelDB("paradigm", dir)
	if err != nil {
		return nil, err
	}

	if debug {
		return db.NewDebugDB("db", gdb), nil
	}

	return gdb, nil
}

func main() {
	dir := os.Getenv("PARADIGM_HOME")
	debugDB := os.Getenv("PARADIGM_DEBUG_DB") != ""
	db, err := newDB(dir, debugDB)
	if err != nil {
		log.Fatal(err)
	}

	app := abci.NewApp(store.NewState(), db)
	srv, err := abci.StartInProcessServer(app, dir)
	if err != nil {
		log.Fatal(err)
	}

	srv.Wait()
}
