package witness

import (
	"os"
	"testing"

	"github.com/stretchr/testify/suite"
)

func TestEthereum(t *testing.T) {
	addr := os.Getenv("ETHEREUM_TEST_ADDRESS")
	eth, err := NewEthereumProvider(addr)
	if err != nil {
		t.Skipf("Can't connect to Ethereum: %+v, did you set ETHEREUM_TEST_ADDRESS?", err)
	}

	suite.Run(t, NewWitnessTestSuite(eth))
}
