package tests

import (
	"math/rand"
	"os"
	"testing"
)

func envOrSkip(t *testing.T, env string) string {
	v := os.Getenv(env)
	if v == "" {
		t.Skipf("Integration test suite requires '%s' to be exported", env)
	}
	return v
}

func randomHex(size int) string {
	var alphabet = []rune("abcdefABCDEF0123456789")

	b := make([]rune, size)
	for i := range b {
		b[i] = alphabet[rand.Intn(len(alphabet))]
	}
	return string(b)
}
