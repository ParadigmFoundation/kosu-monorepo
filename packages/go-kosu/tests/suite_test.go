package tests

import (
	"go-kosu/abci"

	"github.com/stretchr/testify/suite"
)

type Suite struct {
	suite.Suite

	client *abci.Client
	app    *abci.App
}
