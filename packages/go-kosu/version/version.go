package version

import (
	"fmt"
	"go-kosu/rpc"
	"runtime"

	"github.com/tendermint/tendermint/version"
)

// These flags are passed at compile time as follows:
//   go build -ldflags "-X go-kosu/version.Version=1.0 \
//                      -X go-kosu/version.GitCommit=sha"
var (
	Version   = "<dev>"
	GitCommit = "<N/A>"
)

// Info defines the application version information.
type Info struct {
	Version    string
	GitCommit  string
	RPCVersion string
	TMVersion  string
	GoVersion  string
}

// NewInfo returns a new populated Info.
func NewInfo() Info {
	return Info{
		Version:    Version,
		GitCommit:  GitCommit,
		RPCVersion: rpc.Version,
		TMVersion:  version.TMCoreSemVer,
		GoVersion:  runtime.Version(),
	}
}

func (info Info) String() string {
	str := `
Build:
 Version:            %s
 Git commit:         %s
API:
 JSON-RPC:           %s
Runtime:
 Tendermint Version: %s
 Go Version:         %s`
	return fmt.Sprintf(str[1:],
		info.Version, info.GitCommit,
		info.RPCVersion,
		info.TMVersion, info.GoVersion,
	)
}
