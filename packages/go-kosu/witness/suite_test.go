package witness

import (
	"context"
	"testing"

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

	initHeight, err := w.GetLastBlockNumber(ctx)
	require.NoError(t, err)
	require.True(t, initHeight > 0, "GetLastBlockNumber should > 0")

	ch := make(chan *Block, 10)
	go func() {
		defer cancel()

		blk := <-ch
		diff := blk.Number.Uint64() - initHeight
		assert.True(t, diff > 0,
			"Expeting blk.Number(%s) >= initHeight(%d)", blk.Number.String(), initHeight,
		)
	}()

	err = w.WatchBlocks(ctx, ch) //nolint
	ctx.Done()
	require.Equal(t, ctx.Err(), err)

}

func (suite *WitnessTestSuite) TestHandleEvents() {
	suite.testHandleEvents(suite.T(), suite.w)
}

func (suite *WitnessTestSuite) testHandleEvents(t *testing.T, w Provider) {
	ctx, cancel := context.WithCancel(context.Background())

	var event *Event
	ch := make(chan *Event, 10)
	go func() { event = <-ch; cancel() }()

	err := w.WatchEvents(ctx, ch)
	require.Error(t, err)

	last, err := w.GetLastBlockNumber(context.Background())
	require.NoError(t, err)

	assert.True(t, last > event.Block.Number.Uint64(), "First event should be older than last block")
}
