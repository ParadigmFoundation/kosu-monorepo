package version

import (
	"fmt"

	"github.com/spf13/cobra"
)

// NewCommand returns a new version subcommand.
// This should be embedded in any kosu command that want to display the version info.
func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "version",
		Short: "Print the version",
		Run: func(_ *cobra.Command, _ []string) {
			fmt.Println(NewInfo().String())
		},
	}
}
