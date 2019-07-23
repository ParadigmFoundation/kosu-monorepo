package main

import (
	"fmt"
	"go/doc"
	"go/parser"
	"go/token"
	"log"
	"os"
	"text/template"
)

// nolint
type DocEntry struct {
	Method string `json:"method"`
	Text   string `json:"text"`
}

type TypeDocs struct {
	Title       string
	Description string
	Entries     []DocEntry
}

type PkgDocs struct {
	Title       string
	Description string
	Types       []TypeDocs
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

	pkg := doc.New(pkgs["rpc"], os.Args[1], doc.AllDecls)
	pkgDocs := PkgDocs{
		Title:       pkg.Name,
		Description: pkg.Doc,
	}
	for _, t := range pkg.Types {
		if t.Name != "Service" {
			continue
		}
		typeDocs := TypeDocs{Title: t.Name, Description: t.Doc}
		for _, m := range t.Methods {
			typeDocs.Entries = append(typeDocs.Entries, DocEntry{Method: m.Name, Text: m.Doc})
		}
		pkgDocs.Types = append(pkgDocs.Types, typeDocs)
	}

	t, err := template.New("template.md").ParseFiles("./template.md.tpl")
	if err != nil {
		panic(err)
	}
	if err := t.Execute(os.Stdout, pkgDocs); err != nil {
		panic(err)
	}

}
