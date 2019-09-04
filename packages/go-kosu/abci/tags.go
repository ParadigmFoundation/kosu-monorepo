package abci

import (
	"strconv"

	"github.com/tendermint/tendermint/libs/common"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/abci/types"
	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
)

// NewTagsFromRoundInfo returns a set of KVPair tags given a state.RoundInfo
func NewTagsFromRoundInfo(info *types.RoundInfo) []common.KVPair {
	return []common.KVPair{
		{Key: []byte("tx.type"), Value: []byte("rebalance")},
		{Key: []byte("round.number"), Value: []byte(strconv.FormatUint(info.Number, 10))},
		{Key: []byte("round.start"), Value: []byte(strconv.FormatUint(info.StartsAt, 10))},
		{Key: []byte("round.end"), Value: []byte(strconv.FormatUint(info.EndsAt, 10))},
	}
}

// NewRoundInfoFromEvents parses a set of tags and returns a state.RoundInfo
func NewRoundInfoFromEvents(events map[string][]string) (*types.RoundInfo, error) {
	var info types.RoundInfo
	var err error

	fields := []struct {
		tag string
		val *uint64
	}{
		{"tags.round.number", &info.Number},
		{"tags.round.start", &info.StartsAt},
		{"tags.round.end", &info.EndsAt},
	}

	for _, field := range fields {
		tags := events[field.tag]
		if len(tags) == 0 {
			continue
		}

		*field.val, err = strconv.ParseUint(tags[0], 10, 64)
		if err != nil {
			return nil, err
		}
	}

	return &info, nil
}

// NewKVPairFromOrderInfo returns the KVPairs necessary to make up Order transaction tags
func NewKVPairFromOrderInfo(orderID []byte, posterAddress store.Address, newLimit uint64) []common.KVPair {
	return []common.KVPair{
		{Key: []byte("tx.type"), Value: []byte("order")},
		{Key: []byte("order.id"), Value: orderID},
		{Key: []byte("order.poster"), Value: posterAddress.Bytes()},
		{Key: []byte("poster.limit"), Value: []byte(strconv.FormatUint(newLimit, 10))},
	}
}
