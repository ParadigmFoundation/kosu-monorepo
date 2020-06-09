package abci

import (
	"fmt"
	"math/big"

	tmtypes "github.com/tendermint/tendermint/types"
)

const (
	MaxTotalVotingPower = tmtypes.MaxTotalVotingPower - 1024
)

// AllocatePower return the proportion of MaxPower belonging to n.
// total is the total balance of the validator set
func AllocatePower(total, n *big.Int) int64 {
	if total.Int64() == 0 {
		total = big.NewInt(MaxTotalVotingPower)
	}

	switch total.Cmp(n) {
	case -1:
		panic(fmt.Sprintf(
			"n can't be BE than total, got total:%v, n:%v", total, n,
		))
	case 0:
		return MaxTotalVotingPower
	}

	// Perform a cross-multiplication to find the proportion, this is
	// N * MaxTotalVotingPower / TOTAL
	prod := big.NewInt(0).Mul(
		n,
		big.NewInt(MaxTotalVotingPower),
	)
	ratio := big.NewInt(0).Div(prod, total)

	return ratio.Int64()
}
