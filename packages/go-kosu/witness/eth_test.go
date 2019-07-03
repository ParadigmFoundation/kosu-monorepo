package witness

import (
	"os"
	"testing"

	"github.com/stretchr/testify/suite"
)

func TestEthereum(t *testing.T) {
	addr := os.Getenv("WEB3_URI")
	eth, err := NewEthereumProvider(addr)
	if err != nil {
		t.Skipf("Can't connect to Ethereum: %+v, did you set WEB3_URI?", err)
	}

	suite.Run(t, NewWitnessTestSuite(eth))
}
