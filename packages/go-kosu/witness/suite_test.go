package witness

import (
	"context"
	"math/big"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type WitnessTestSuite struct {
	suite.Suite
	w Provider
}

func NewWitnessTestSuite(w Provider) *WitnessTestSuite {
	return &WitnessTestSuite{w: w}
}

func (suite *WitnessTestSuite) TestHandleBlocks() {
	suite.testHandleBlocks(suite.T(), suite.w)
}

func (suite *WitnessTestSuite) testHandleBlocks(t *testing.T, w Provider) {
	ctx, cancel := context.WithCancel(context.Background())

	initHeight, err := w.GetBlockNumber(ctx)
	require.NoError(t, err)
	require.True(t, initHeight.Cmp(big.NewInt(0)) == 1, "GetBlockNumber should > 0")

	err = w.HandleBlocks(ctx, func(blk *Block) {
		defer cancel()
		diff := new(big.Int).Sub(blk.Number, initHeight)
		assert.True(t, diff.Int64() >= 0,
			"Expeting blk.Number(%s) >= initHeight(%s)", blk.Number.String(), initHeight.String(),
		)
	})
	require.Error(t, err)
	require.Equal(t, context.Canceled, err)
}

func (suite *WitnessTestSuite) TestHandleEvents() {
	suite.testHandleEvents(suite.T(), suite.w)
}

func (suite *WitnessTestSuite) testHandleEvents(t *testing.T, w Provider) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var events []*Event
	err := w.HandleEvents(ctx, func(e *Event) {
		events = append(events, e)
	})
	require.Equal(t, context.DeadlineExceeded, err)

	t.Run("OrderedBlocks", func(t *testing.T) {
		var lastBlock uint64
		for _, e := range events {
			require.NotZero(t, e.Block)

			curBlock := e.Block.Number.Uint64()
			assert.True(t, curBlock >= lastBlock)
			lastBlock = curBlock
		}
	})
}
