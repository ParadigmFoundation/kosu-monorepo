package store

import (
	"errors"
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/tendermint/iavl"
	"github.com/tendermint/tendermint/libs/db"
)

const (
	commitInfoKey      = "/paradigm/commitinfo"
	roundInfoKey       = "/paradigm/state/round_info"
	lastEventKey       = "/paradigm/state/last_event"
	consensusParamsKey = "/paradigm/state/consensus_params"
	eventsKey          = "/paradigm/state/events"
)

// CommitInfo is the tree commit info.
type CommitInfo struct {
	Hash    []byte
	Version int64
}

// StateTree is a higher level IAVL tree.
// It provides convenience methods to make it easy to work with the state.
type StateTree struct {
	db    db.DB
	tree  *iavl.MutableTree
	codec Codec

	CommitInfo CommitInfo
}

// NewStateTree returns a new StateTree.
func NewStateTree(db db.DB, codec Codec) *StateTree {
	tree := iavl.NewMutableTree(db, 1000)
	s := &StateTree{
		db:    db,
		tree:  tree,
		codec: codec,
	}

	if err := s.loadCommitData(); err != nil {
		panic(err)
	}
	return s
}

// loadCommitData reads the CommitInfo directly from the db.DB,
func (s *StateTree) loadCommitData() error {
	buf := s.db.Get([]byte(commitInfoKey))
	if buf == nil {
		return nil
	}
	if err := s.codec.Decode(buf, &s.CommitInfo); err != nil {
		return err
	}

	_, err := s.tree.LoadVersion(s.CommitInfo.Version)
	return err
}

// Commit .
func (s *StateTree) Commit() error {
	hash, version, err := s.tree.SaveVersion()
	if err != nil {
		return err
	}

	if v := s.tree.Version(); v > 1 {
		if err := s.tree.DeleteVersion(v - 1); err != nil {
			return err
		}
	}

	s.CommitInfo.Hash = hash
	s.CommitInfo.Version = version

	buf, err := s.codec.Encode(s.CommitInfo)
	if err != nil {
		return err
	}

	s.db.Set([]byte(commitInfoKey), buf)
	return nil
}

// Set sets a key in the Tree, the value is encoded by codec.
func (s *StateTree) Set(key string, value interface{}) error {
	buf, err := s.codec.Encode(value)
	if err != nil {
		return err
	}

	s.tree.Set([]byte(key), buf)
	return nil
}

// Get retrieves the value under key and saves the decoded value in e.
func (s *StateTree) Get(key string, e interface{}) error {
	_, buf := s.tree.Get([]byte(key))
	if buf == nil {
		return nil
	}
	return s.codec.Decode(buf, e)
}

// SetEvent sets an event into the tree.
func (s *StateTree) SetEvent(block uint64, id string, w *WitnessEvent) error {
	key := fmt.Sprintf("%s/%d/%s", eventsKey, block, id)
	return s.Set(key, w)
}

// IterateEvents iterates over all the events present in the tree.
func (s *StateTree) IterateEvents(fn func(block uint64, id string, w *WitnessEvent)) {
	start := []byte(eventsKey)
	end := append(start, 0xff)
	s.tree.IterateRange(start, end, true, func(key, val []byte) bool {
		block, id, err := s.parseEventsKey(key)
		if err != nil {
			// TODO: should we handle the error?
			log.Printf("IterateEvents: %+v", err)
			return false
		}
		var w WitnessEvent
		if err := s.codec.Decode(val, &w); err != nil {
			return false
		}

		fn(block, id, &w)
		return false
	})
}

// parseEvents takes a key with the form "<eventsKey>/<id>/<address>" and returns <id> and <address>.
func (s *StateTree) parseEventsKey(b []byte) (uint64, string, error) {
	// keep only the `id/address` part of the original key
	key := strings.TrimPrefix(string(b), eventsKey+"/")

	// split should be [id, address]
	split := strings.Split(key, "/")
	if len(split) != 2 {
		return 0, "", errors.New("invalid key format")
	}

	block, err := strconv.ParseUint(split[0], 10, 64)
	if err != nil {
		return 0, "", err
	}
	id := split[1]

	return block, id, nil
}
