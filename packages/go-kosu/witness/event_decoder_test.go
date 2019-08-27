// nolint:lll
package witness

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

/*
Event sample:
&{
	EventType:PosterRegistryUpdate,
	Data:[
		[0 0 0 0 0 0 0 0 0 0 0 0 197 33 244 131 246 7 235 94 164 214 178 223 219 213 64 19 71 83 168 101]
		[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 54 53 201 173 197 222 160 0 0]
	],
	StringData: "",
	Raw: {
		Address:[47 58 254 255 9 20 243 55 105 205 251 243 252 248 112 195 59 38 195 17],
		Topics:[
			[189 100 126 158 46 239 23 47 63 222 199 104 53 130 154 36 250 133 178 140 109 116 199 22 231 232 165 200 126 191 198 131]
		],
		Data:[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 96 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 160 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 20 80 111 115 116 101 114 82 101 103 105 115 116 114 121 85 112 100 97 116 101 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 0 0 0 0 0 0 0 0 0 197 33 244 131 246 7 235 94 164 214 178 223 219 213 64 19 71 83 168 101 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 54 53 201 173 197 222 160 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0],
		BlockNumber:179,
		TxHash:[254 44 32 185 99 231 19 3 49 66 107 150 41 50 126 209 225 171 83 37 91 202 130 213 197 171 220 249 25 175 158 185]
		TxIndex:0
		BlockHash:[137 33 85 47 221 52 12 204 168 235 214 187 95 58 253 82 202 49 113 33 29 230 25 58 32 196 120 188 1 208 50 96]
		Index:1
		Removed:false
	}
}"
*/
func TestEventPosterRegistryUpdateDecoding(t *testing.T) {
	newEvent := func() *EventEmitterKosuEvent {
		return &EventEmitterKosuEvent{
			EventType: "PosterRegistryUpdate",
			Data: [][32]byte{
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 197, 33, 244, 131, 246, 7, 235, 94, 164, 214, 178, 223, 219, 213, 64, 19, 71, 83, 168, 101},
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 53, 201, 173, 197, 222, 160, 0, 0},
			},
		}
	}

	t.Run("ValidEvent", func(t *testing.T) {
		src := newEvent()
		dst := &EventPosterRegistryUpdate{}

		require.NoError(t,
			DecodeKosuEvent(src, dst),
		)

		assert.Equal(t, "0xc521f483f607eb5ea4d6b2dfdbd540134753a865", dst.Address.String())
		assert.Equal(t, "1000000000000000000000", dst.Amount.String())
	})

	t.Run("InvalidType", func(t *testing.T) {
		src := newEvent()
		dst := struct{}{}

		require.Error(t,
			DecodeKosuEvent(src, dst),
		)
	})
}

func TestEventValidatorRegistryUpdateDecoding(t *testing.T) {
	newEvent := func() *EventEmitterKosuEvent {
		return &EventEmitterKosuEvent{
			EventType: "ValidatorRegistryUpdate",
			Data: [][32]byte{
				{222, 173, 190, 239},
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 197, 33, 244, 131, 246, 7, 235, 94, 164, 214, 178, 223, 219, 213, 64, 19, 71, 83, 168, 101},
				{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54, 53, 201, 173, 197, 222, 160, 0, 0},
			},
		}
	}

	t.Run("ValidaEvent", func(t *testing.T) {
		src := newEvent()
		dst := &EventValidatorRegistryUpdate{}

		require.NoError(t,
			DecodeKosuEvent(src, dst),
		)

		assert.Equal(t, "deadbeef00000000000000000000000000000000000000000000000000000000", hex.EncodeToString(dst.PublicKey))
		assert.Equal(t, "0xc521f483f607eb5ea4d6b2dfdbd540134753a865", dst.Address.String())
		assert.Equal(t, "1000000000000000000000", dst.Amount.String())
	})

	t.Run("InvalidType", func(t *testing.T) {
		src := newEvent()
		dst := struct{}{}

		require.Error(t,
			DecodeKosuEvent(src, dst),
		)
	})
}
