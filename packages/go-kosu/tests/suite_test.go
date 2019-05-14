package tests

import (
	"go-kosu/abci"
	"go-kosu/store"

	"github.com/stretchr/testify/suite"
)

type Suite struct {
	suite.Suite

	state  *store.State
	client *abci.Client
}
