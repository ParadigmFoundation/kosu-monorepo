package tests

import (
	"go-kosu/abci"

	"github.com/stretchr/testify/suite"

	cfg "github.com/tendermint/tendermint/config"
)

type Suite struct {
	suite.Suite

	client *abci.Client
	config *cfg.Config
}
