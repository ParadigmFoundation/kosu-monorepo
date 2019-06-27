package store

import (
	"encoding/json"
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAddressOK(t *testing.T) {
	cases := []struct {
		name  string
		str   string
		bytes []byte
	}{
		{
			"#1 non-checksummed",
			"0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292",
			[]byte{99, 181, 119, 214, 204, 15, 57, 211, 41, 247, 191, 26, 75, 204, 196, 161, 234, 252, 130, 146},
		},
		{
			"#2 non-checksummed",
			"0x23df63a15ab38ae44930931ad46307a264494c09",
			[]byte{35, 223, 99, 161, 90, 179, 138, 228, 73, 48, 147, 26, 212, 99, 7, 162, 100, 73, 76, 9},
		},
		{
			"#3 checksummed",
			"0x8b366a3d4e46aC5406F12766Ad33E6482Ce4F081",
			[]byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
		{
			"#4 non-checksummed",
			"0x8b366a3d4e46ac5406f12766ad33e6482ce4f081",
			[]byte{139, 54, 106, 61, 78, 70, 172, 84, 6, 241, 39, 102, 173, 51, 230, 72, 44, 228, 240, 129},
		},
	}

	for _, test := range cases {
		t.Run(test.name, func(t *testing.T) {
			addr, err := NewAddressFromString(test.str)
			require.NoError(t, err)

			assert.Equal(t, test.bytes, addr.Bytes())
			assert.Equal(t, strings.ToLower(test.str), addr.String())
			assert.Equal(t, addr, MustNewAddress(addr.Bytes()))
		})
	}
}

func TestAddressErr(t *testing.T) {
	cases := []struct {
		name string
		addr string
	}{
		{"too short", "0xff"},
		{"too long", "0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292ffff"},
		{"no hex", "size is right but content is not valid fmt"},
	}

	for _, test := range cases {
		t.Run(test.name, func(t *testing.T) {
			_, err := NewAddressFromString(test.addr)
			assert.Error(t, err)
		})
	}
}

func TestAddressJSON(t *testing.T) {
	addr := "0x63b577d6cc0f39d329f7bf1a4bccc4a1eafc8292"
	jsonStr := fmt.Sprintf(`{"addr":"%s"}`, addr)
	obj := struct {
		Addr Address `json:"addr"`
	}{}

	t.Run("UnmarshalOK", func(t *testing.T) {
		require.NoError(t,
			json.Unmarshal([]byte(jsonStr), &obj),
		)

		assert.Equal(t, addr, obj.Addr.String())
	})

	t.Run("UnmarshalInvalidLength", func(t *testing.T) {
		t.SkipNow()
	})

	t.Run("Marshal", func(t *testing.T) {
		obj.Addr = MustNewAddressString(addr)
		buf, err := json.Marshal(&obj)
		require.NoError(t, err)

		assert.Equal(t, jsonStr, string(buf))
	})
}
