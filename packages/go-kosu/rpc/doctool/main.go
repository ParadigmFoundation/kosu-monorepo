package main

import (
	"encoding/json"
	"fmt"
	"go/doc"
	"go/parser"
	"go/token"
	"log"
	"os"
)

type DocEntry struct {
	Method string `json:"method"`
	Text   string `json:"text"`
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: doctool <path>")
		return
	}

	fset := token.NewFileSet()
	pkgs, err := parser.ParseDir(fset, os.Args[1], nil, parser.ParseComments)
	if err != nil {
		log.Fatal(err)
	}

	docs := []DocEntry{}
	pkg := doc.New(pkgs["rpc"], os.Args[1], doc.AllDecls)
	for _, t := range pkg.Types {
		for _, m := range t.Methods {
			docs = append(docs, DocEntry{Method: m.Name, Text: m.Doc})
		}
	}

	text, err := json.MarshalIndent(docs, "", "    ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", text)
}
