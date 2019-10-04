package main

import (
	"log"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/cli"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/version"
)

// Flags holds the PersistentFlags
type Flags struct {
	Home string
}

func main() {
	var flags Flags

	cobra.OnInitialize(func() {
		flags.Home = expandPath(flags.Home)
	})

	rootCmd := &cobra.Command{
		Use:   "kosud",
		Short: "The Kosud node",
	}
	rootCmd.PersistentFlags().StringVarP(&flags.Home, "home", "H", "~/.kosu", "directory for config and data")

	rootCmd.AddCommand(
		cli.NewInitCommand("home"),
		cli.NewStartCommand("home"),
		cli.NewNodeCommand("home"),
		version.NewCommand(),
	)

	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
	}
}

func expandPath(path string) string {
	usr, err := user.Current()
	if err != nil {
		return path
	}

	if path == "~" {
		return usr.HomeDir
	} else if strings.HasPrefix(path, "~/") {
		return filepath.Join(usr.HomeDir, path[2:])
	}

	return path
}
