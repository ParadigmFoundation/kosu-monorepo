package abci

import (
	"strconv"

	"github.com/tendermint/tendermint/libs/common"

	"go-kosu/store"
)

// NewTagsFromRoundInfo returns a set of KVPair tags given a state.RoundInfo
func NewTagsFromRoundInfo(info *store.RoundInfo) []common.KVPair {
	return []common.KVPair{
		{Key: []byte("tx.type"), Value: []byte("rebalance")},
		{Key: []byte("round.number"), Value: []byte(strconv.FormatUint(info.Number, 10))},
		{Key: []byte("round.start"), Value: []byte(strconv.FormatUint(info.StartsAt, 10))},
		{Key: []byte("round.end"), Value: []byte(strconv.FormatUint(info.EndsAt, 10))},
	}
}

// NewRoundInfoFromTags parses a set of tags and returns a state.RoundInfo
func NewRoundInfoFromTags(tags map[string]string) (*store.RoundInfo, error) {
	var info store.RoundInfo
	var err error

	fields := []struct {
		tag string
		val *uint64
	}{
		{"round.number", &info.Number},
		{"round.start", &info.StartsAt},
		{"round.end", &info.EndsAt},
	}

	for _, field := range fields {
		*field.val, err = strconv.ParseUint(tags[field.tag], 10, 64)
		if err != nil {
			return nil, err
		}
	}

	return &info, nil
}
