package abci

import (
	"fmt"
	"math/big"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func newBigFromString(t *testing.T, s string) *big.Int {
	bn, ok := big.NewInt(0).SetString(s, 10)
	require.True(t, ok)
	return bn
}

func TestAllocatePower(t *testing.T) {
	assert.Panics(t,
		func() { _ = AllocatePower(big.NewInt(10), big.NewInt(11)) },
	)

	tests := []struct {
		total    *big.Int
		n        *big.Int
		expected int64
	}{
		{big.NewInt(MaxTotalVotingPower), big.NewInt(0), 0},
		{big.NewInt(MaxTotalVotingPower), big.NewInt(1), 1},
		{big.NewInt(10), big.NewInt(10), MaxTotalVotingPower},
		{big.NewInt(10), big.NewInt(5), MaxTotalVotingPower / 2},
		{big.NewInt(9), big.NewInt(3), MaxTotalVotingPower / 3},
		{big.NewInt(0), big.NewInt(0), 0},
		{big.NewInt(0), big.NewInt(1), 1},
	}

	for _, test := range tests {
		assert.Equal(t, test.expected,
			AllocatePower(test.total, test.n),
			fmt.Sprintf("when total: %s and n: %s", test.total.String(), test.n.String()),
		)
	}
}
