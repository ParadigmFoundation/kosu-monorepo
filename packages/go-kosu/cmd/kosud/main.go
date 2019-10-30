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

const (
	homeFlag = "home"
)

// New returns a new root command
func New() *cobra.Command {
	var flags Flags

	cmd := &cobra.Command{
		Use:   "kosud",
		Short: "The Kosud node",
	}
	cmd.PersistentFlags().StringVarP(&flags.Home, homeFlag, "H", "~/.kosu", "directory for config and data")
	cmd.PersistentPreRun = func(cmd *cobra.Command, args []string) {
		flags.Home = expandPath(flags.Home)
	}

	cmd.AddCommand(
		cli.NewInitCommand(homeFlag),
		cli.NewStartCommand(homeFlag),
		cli.NewNodeCommand(homeFlag),
		version.NewCommand(),
	)

	return cmd
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

func main() {
	if err := New().Execute(); err != nil {
		log.Fatal(err)
	}
}
