package tests

import (
	"paradigmcore/abci"
	"paradigmcore/abci/types"
	"paradigmcore/store"

	"github.com/stretchr/testify/suite"
)

type Suite struct {
	suite.Suite

	state  *store.State
	client *abci.Client
}

func (s *Suite) SetupTest() {
	_, privKey, err := types.NewKeyPair()
	if err != nil {
		s.Require().NoError(err)
	}

	s.state = store.NewState()
	s.client = abci.NewHTTPClient("http://localhost:26657", privKey)
}
