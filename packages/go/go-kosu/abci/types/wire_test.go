package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEncodeDecodeTx(t *testing.T) {
	tests := []struct {
		name string
		tx   interface{}
	}{
		{
			name: "Rebalance",
			tx: &TransactionRebalance{RoundInfo: &RoundInfo{
				Number:   1,
				StartsAt: 2,
				EndsAt:   3,
				Limit:    4,
			}},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			wtx := WrapTx(test.tx)

			buf, err := EncodeTx(wtx)
			require.NoError(t, err)

			got := &Transaction{}
			require.NoError(t,
				DecodeTx(buf, got),
			)

			assert.Equal(t, wtx.String(), got.String())
		})
	}
}
