package main

import (
	"fmt"
	"go/ast"
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
	Title         string
	Description   string
	Methods       []DocEntry
	Subscriptions []DocEntry
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

			entry := DocEntry{Method: m.Name, Text: m.Doc}
			if isSubscription(m.Decl) {
				typeDocs.Subscriptions = append(typeDocs.Subscriptions, entry)
			} else {
				typeDocs.Methods = append(typeDocs.Methods, entry)
			}
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

// isSubscription checks wether a FuncDecl satisfies the rpc requirements defined here:
// https://godoc.org/github.com/ethereum/go-ethereum/rpc#hdr-Subscriptions
// We are looking for any func(r <RECV>) (context.Context, ...) (rpc.Subscription, error).
// The implementation is pretty hard to follow but it works. \o/ YOLO!
func isSubscription(decl *ast.FuncDecl) bool {
	// - first method argument type must be context.Context
	params := decl.Type.Params.List
	if len(params) == 0 {
		return false
	}

	sel, ok := params[0].Type.(*ast.SelectorExpr)
	if !ok {
		return false
	}
	if fmt.Sprintf("%s.%s", sel.X, sel.Sel) != "context.Context" {
		return false
	}

	// - method must have return types (rpc.Subscription, error)
	returns := decl.Type.Results.List
	if len(returns) != 2 {
		return false
	}

	start, ok := returns[0].Type.(*ast.StarExpr)
	if !ok {
		return false
	}

	sel, ok = start.X.(*ast.SelectorExpr)
	if !ok {
		return false
	}
	if fmt.Sprintf("%s.%s", sel.X, sel.Sel) != "rpc.Subscription" {
		return false
	}

	ident, ok := returns[1].Type.(*ast.Ident)
	if !ok {
		return false
	}
	if ident.Name != "error" {
		return false
	}

	return true
}
