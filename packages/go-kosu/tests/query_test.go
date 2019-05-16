package tests

import (
	"testing"

	. "github.com/smartystreets/goconvey/convey"
	"github.com/stretchr/testify/require"
)

func (s *Suite) TestQuery() {
	GivenABCIServer(s.T(), s, func(t *testing.T) {
		Convey("When a query to an invalid path is run", func() {
			res, err := s.client.ABCIQuery("/some_wrong_path", nil)
			require.NoError(t, err)
			Convey("It should Err", func() {
				So(res.Response.IsErr(), ShouldBeTrue)
				So(res.Response.Info, ShouldContainSubstring, "not found")
			})
		})

		paths := []string{
			"/consensusparams",
			"/roundinfo",
		}

		for _, path := range paths {
			Convey("When query "+path, func() {
				res, err := s.client.ABCIQuery(path, nil)
				require.NoError(t, err)
				Convey("It should OK", func() {
					So(res.Response.IsOK(), ShouldBeTrue)
				})
			})
		}
	})
}
