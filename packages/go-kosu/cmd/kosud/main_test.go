package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"os"
	"path"
	"strings"
	"testing"
	"time"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/version"
	"github.com/phayes/freeport"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

func stringify(params []interface{}) []string {
	args := make([]string, len(params))
	for i, param := range params {
		var arg string
		switch t := param.(type) {
		case string:
			arg = t
		case int:
			arg = fmt.Sprintf("%d", param)
		default:
			panic(
				fmt.Sprintf("can't handle type %T", t),
			)
		}
		args[i] = arg
	}
	return args
}

// RunTestCmd runs a command and returns its output.
// If fails and empty output and an error is returned.
func RunTestCmd(params ...interface{}) (string, error) {
	// Take control over the stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	// run the command and its arguments
	args := stringify(params)
	cmd := New()
	cmd.SetArgs(args)
	err := cmd.Execute()
	if err != nil {
		return "", err
	}

	// read the output
	_ = w.Close() // we need to close to be able to read
	bytes, err := ioutil.ReadAll(r)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

type KosudSuite struct {
	suite.Suite
}

// Init will run the `kosud init` command using a TempDir as the HomeDir
// and execute fn if the command was successful, the test will fail otherwise.
func (s *KosudSuite) Init(fn func(dir string, out string)) {
	dir, err := ioutil.TempDir("", "kosud-test-main-")
	s.Require().NoError(err)
	defer os.RemoveAll(dir) // nolint:errcheck

	out, err := RunTestCmd("init", "-H", dir)
	s.Require().NoError(err)

	if fn != nil {
		fn(dir, out)
	}
}

// Start starts kosud in a goroutine and wait until it's up and running by trying to connect to it's `--laddr` argument.
// If `--laddr` is not used it will use the default `tcp://localhost:26657` as `laddr`.
// If after t duration it can't connect, an error is returned.
// TODO: Once started, kosud can't be stopped.
func (s *KosudSuite) Start(t time.Duration, args ...interface{}) error {
	go func() {
		_, err := RunTestCmd(append([]interface{}{"start"}, args...)...)
		s.Require().NoError(err)
	}()

	// find the laddr within the arguments or use the default
	var laddr = "tcp://localhost:26657"
	for i, arg := range args {
		if arg == "--laddr" {
			laddr = args[i+1].(string)
		}
	}

	timeout := time.After(t)
	for {
		select {
		case <-timeout:
			return errors.New("kosud start timed out")
		default:
			time.Sleep(100 * time.Millisecond)
			if canConnect(laddr) {
				return nil
			}
		}
	}
}

func canConnect(addr string) bool {
	addr = strings.TrimPrefix(addr, "tcp://")
	c, err := net.Dial("tcp", addr)
	if err == nil {
		_ = c.Close()
		return true
	}
	return false
}

// TestHelp tests `kosud help` sub-command
func (s *KosudSuite) TestHelp() {
	out, err := RunTestCmd("help")
	require.NoError(s.T(), err)

	assert.Contains(s.T(), out, "The Kosud node")
	assert.Contains(s.T(), out, "Usage:")
}

// TestVersion tests `kosud version` sub-command
func (s *KosudSuite) TestVersion() {
	out, err := RunTestCmd("version")
	s.Require().NoError(err)

	s.Assert().Contains(out, "Build:")
	s.Assert().Contains(out, version.Version)
	s.Assert().Contains(out, version.GitCommit)
}

// TestInit tests `kosud init` sub-command
func (s *KosudSuite) TestInit() {
	s.Init(func(dir string, out string) {
		s.Assert().Contains(out, "Generated private validator")
		s.Assert().Contains(out, "Generated node key")
		s.Assert().Contains(out, "Generated genesis file")

		var err error
		_, err = os.Stat(path.Join(dir, "config"))
		s.Assert().Nil(err)

		_, err = os.Stat(path.Join(dir, "data"))
		s.Assert().Nil(err)
	})
}

// TestNodeInfo tests `kosud node into` sub-command
func (s *KosudSuite) TestNodeInfo() {
	s.Init(func(_, _ string) {
		out, err := RunTestCmd("node", "info")
		s.Require().NoError(err)

		s.Assert().Contains(out, "Public Key: ")
		s.Assert().Contains(out, "Node ID: ")
		s.Assert().Contains(out, "Moniker: ")
	})
}

// TestNodeReset tests `kosud node reset` sub-command
func (s *KosudSuite) TestNodeReset() {
	s.Init(func(_, _ string) {
		out, err := RunTestCmd("node", "reset")
		s.Require().NoError(err)

		s.Assert().Contains(out, "Removed all blockchain history")
		s.Assert().Contains(out, "Reset private validator")
	})
}

// TestStart tests `kosud start` sub-command
func (s *KosudSuite) TestStart() {
	laddr, err := freeport.GetFreePort()
	s.Require().NoError(err)

	eth, err := freeport.GetFreePort()
	s.Require().NoError(err)

	// http server to respond to fake ethereum connections
	// nolint:errcheck
	go http.ListenAndServe(fmt.Sprintf(":%d", eth), http.HandlerFunc(
		func(_ http.ResponseWriter, _ *http.Request) {
			select {}
		},
	))

	s.Init(func(dir, out string) {
		// Start kosud
		err := s.Start(1*time.Second,
			"--home", dir,
			"--laddr", fmt.Sprintf("tcp://127.0.0.1:%d", laddr),
			"--validator.web3", fmt.Sprintf("ws://127.0.0.1:%d", eth),
		)
		s.Require().NoError(err)

		res, err := http.Get(fmt.Sprintf("http://localhost:%d", laddr))
		s.Require().NoError(err)
		s.Assert().Equal(200, res.StatusCode)
		_ = res.Body.Close()
	})

}

func TestKosudSuite(t *testing.T) {
	if ci := os.Getenv("CI"); ci != "" {
		t.SkipNow()
	}

	suite.Run(t, new(KosudSuite))
}
