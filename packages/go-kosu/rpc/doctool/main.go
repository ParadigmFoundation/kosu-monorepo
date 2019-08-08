package main

import (
	"fmt"
	"go/doc"
	"go/parser"
	"go/token"
	"log"
	"os"
	"strings"
	"text/template"
)

// DocEntry holds documentation for a method
type DocEntry struct {
	Method string `json:"method"`
	Text   string `json:"text"`
}

// TypeDocs holds the documentation of a given type
type TypeDocs struct {
	Title       string
	Description string
	Entries     []DocEntry
}

// PkgDocs is the top level doc struct
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
			if !isPublic(m.Name) {
				continue
			}
			typeDocs.Entries = append(typeDocs.Entries, DocEntry{Method: m.Name, Text: m.Doc})
		}
		pkgDocs.Types = append(pkgDocs.Types, typeDocs)
	}

	t, err := template.New("template.md.tpl").ParseFiles("./template.md.tpl")
	if err != nil {
		panic(err)
	}
	if err := t.Execute(os.Stdout, pkgDocs); err != nil {
		panic(err)
	}
}

func isPublic(s string) bool {
	if s == "" {
		return false
	}

	return strings.ToUpper(s[:1]) == s[:1]
}
