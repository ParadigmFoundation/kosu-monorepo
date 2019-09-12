package tests

import (
	"context"
	"math/rand"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"

	"github.com/tendermint/tendermint/config"
	"github.com/tendermint/tendermint/privval"
	rpctypes "github.com/tendermint/tendermint/rpc/core/types"
	tmtypes "github.com/tendermint/tendermint/types"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

type Node struct {
	Client  *abci.Client
	Config  *config.Config
	PrivVal privval.FilePVKey
}

type IntegrationTestSuite struct {
	suite.Suite

	// Nodes are populated on SetupSuite based on the KOSU_TEST_NODES environment variable
	// KOSU_TEST_NODES is a comma separated list of nodes following this format:
	// <homedir1>[@url],...
	//   <homedir> is required and points to the node home directory
	//   <url> is optional and represents the node url, if not specified it will take the url from config.RPC.ListenAddress
	Nodes []Node

	// CurrentBlock will be updated on each new test from the suite
	CurrentBlock *tmtypes.Block
}

// Client returns the first client out of the node list.
func (suite *IntegrationTestSuite) Client() *abci.Client {
	return suite.Nodes[0].Client
}

func (suite *IntegrationTestSuite) WaitForNewBlock() *tmtypes.Block {
	events, closer, err := suite.Client().Subscribe(context.Background(), "tm.event = 'NewBlock'")
	suite.Require().NoError(err)
	defer closer()

	event := <-events
	return event.Data.(tmtypes.EventDataNewBlock).Block
}

// IsValidTxCommit performs assertions over a BroadcastTxCommit
func (suite *IntegrationTestSuite) IsValidTxCommit(res *rpctypes.ResultBroadcastTxCommit, err error) {
	suite.Require().NoError(err)
	suite.Require().True(res.CheckTx.IsOK(), res.CheckTx.Log)
	suite.Require().True(res.DeliverTx.IsOK(), res.DeliverTx.Log)
}

// IsValidTxSync performs assertions over a BroadcastTxSync
func (suite *IntegrationTestSuite) IsValidTxSync(res *rpctypes.ResultBroadcastTx, err error) {
	suite.Require().NoError(err)
	suite.Require().Zero(res.Code, res.Log)
}

// BroadcastTxCommit is a helper function to Broadcast a Tx under test
func (suite *IntegrationTestSuite) BroadcastTxCommit(tx interface{}) *rpctypes.ResultBroadcastTxCommit {
	res, err := suite.Client().BroadcastTxCommit(tx)
	suite.IsValidTxCommit(res, err)
	return res
}

// BroadcastTxSync is a helper function to Broadcast a Tx under test
func (suite *IntegrationTestSuite) BroadcastTxSync(tx interface{}) *rpctypes.ResultBroadcastTx {
	res, err := suite.Client().BroadcastTxSync(tx)
	suite.IsValidTxSync(res, err)
	return res
}

// WithNode calls fn for every node defined in the node set.
// If fn returns err, the error is returned and the execution stopped.
func (suite *IntegrationTestSuite) WithNode(fn func(*Node) error) error {
	for _, node := range suite.Nodes {
		if err := fn(&node); err != nil {
			return err
		}
	}
	return nil
}

// WithConfirmations Broadcast a Tx across all the nodes so that we make sure it's confirmed
func (suite *IntegrationTestSuite) WithConfirmations(tx interface{}) {
	_ = suite.WithNode(func(node *Node) error {
		suite.IsValidTxSync(
			node.Client.BroadcastTxSync(tx),
		)
		return nil
	})
}

// NextRoundInfo calculates the next round info based on the current one
func (suite *IntegrationTestSuite) NextRoundInfo() *types.RoundInfo {
	round, err := suite.Client().QueryRoundInfo()
	suite.Require().NoError(err)

	diff := round.EndsAt - round.StartsAt
	round.StartsAt = round.EndsAt
	round.EndsAt += diff
	round.Number++

	return round
}

func (suite *IntegrationTestSuite) BroadcastNextRebalance() {
	params, err := suite.Client().QueryConsensusParams()
	suite.Require().NoError(err)

	info, err := suite.Client().QueryRoundInfo()
	if err != nil {
		info = &types.RoundInfo{
			Number:   0,
			StartsAt: 1,
			EndsAt:   1,
		}
	} else {
		info.StartsAt = info.EndsAt
	}
	info.Number++
	info.EndsAt += uint64(params.PeriodLength)

	suite.BroadcastTxCommit(&types.TransactionRebalance{RoundInfo: info})
}

func newClient(t *testing.T, rootdir, url string) *abci.Client {
	key, err := abci.LoadPrivateKey(rootdir)
	require.NoError(t, err)

	client, err := abci.NewHTTPClient(url, key)
	require.NoError(t, err)

	return client
}

func (suite *IntegrationTestSuite) addNode(homedir, url string) {
	cfg, err := abci.LoadConfig(homedir)
	suite.Require().NoError(err)

	priv := privval.LoadFilePV(
		cfg.PrivValidatorKeyFile(),
		cfg.PrivValidatorStateFile(),
	).Key

	if url == "" {
		url = cfg.RPC.ListenAddress
	}

	suite.Nodes = append(suite.Nodes, Node{
		Client:  newClient(suite.T(), homedir, url),
		Config:  cfg,
		PrivVal: priv,
	})
}

// SetupSuite setup the test suite
func (suite *IntegrationTestSuite) SetupSuite() {
	nodes := envOrSkip(suite.T(), "KOSU_TEST_NODES")
	for _, node := range strings.Split(nodes, ",") {
		var homedir, url string
		split := strings.Split(node, "@")
		homedir = split[0]
		if len(split) == 2 {
			url = split[1]
		}
		if !filepath.IsAbs(homedir) {
			suite.T().Fatalf("home dir must be absolute, got: %s", homedir)
		}

		suite.addNode(homedir, url)
	}
}

// SetupTest creates a new subscriptions to `NewBlocks` and waits for a new block before each test
func (suite *IntegrationTestSuite) SetupTest() {
	suite.CurrentBlock = suite.WaitForNewBlock()
}

func (suite *IntegrationTestSuite) TearDownTest() {
}

func (suite *IntegrationTestSuite) TearDownSuite() {
	for _, node := range suite.Nodes {
		err := node.Client.Stop()
		suite.Require().NoError(err)
	}
}

func TestIntegrationTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}
