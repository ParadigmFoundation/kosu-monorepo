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

// nolint
const (
	CommitInfoKey      = "/kosu/commitinfo"
	RoundInfoKey       = "/kosu/state/round_info"
	LastEventKey       = "/kosu/state/last_event"
	ConsensusParamsKey = "/kosu/state/consensus_params"
	EventsKey          = "/kosu/state/events"
	PostersKey         = "/kosu/state/posters"
	ValidatorsKey      = "/kosu/state/validators"
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
	buf := s.db.Get([]byte(CommitInfoKey))
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

	s.db.Set([]byte(CommitInfoKey), buf)
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
	key := fmt.Sprintf("%s/%d/%s", EventsKey, block, id)
	return s.Set(key, w)
}

// IterateEvents iterates over all the events present in the tree.
func (s *StateTree) IterateEvents(fn func(block uint64, id string, w *WitnessEvent)) {
	start := []byte(EventsKey)
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

// parseEvents takes a key with the form "<EventsKey>/<id>/<address>" and returns <id> and <address>.
func (s *StateTree) parseEventsKey(b []byte) (uint64, string, error) {
	// keep only the `id/address` part of the original key
	key := strings.TrimPrefix(string(b), EventsKey+"/")

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

func (s *StateTree) posterKey(addr string) string {
	return fmt.Sprintf("%s/%s", PostersKey, addr)
}

// GetPoster retrieves a poster from the tree
func (s *StateTree) GetPoster(addr string) (*Poster, error) {
	var p Poster
	if err := s.Get(s.posterKey(addr), &p); err != nil {
		return nil, err
	}

	return &p, nil
}

// SetPoster sets a poster into the tree
func (s *StateTree) SetPoster(addr string, p *Poster) error {
	return s.Set(s.posterKey(addr), p)
}

// DeletePoster removes a poster from the tree
func (s *StateTree) DeletePoster(addr string) {
	key := s.posterKey(addr)
	s.tree.Remove([]byte(key))
}

// IteratePosters iterates over all the posters present in the tree
func (s *StateTree) IteratePosters(fn func(addr string, p *Poster)) {
	start := []byte(PostersKey)
	end := append(start, 0xff)
	s.tree.IterateRange(start, end, true, func(key, val []byte) bool {
		// Extract the address from the key
		addr := strings.TrimPrefix(string(key), PostersKey+"/")

		var p Poster
		if err := s.codec.Decode(val, &p); err != nil {
			return false
		}

		fn(addr, &p)
		return false
	})
}

func (s *StateTree) validatorKey(addr string) string {
	return fmt.Sprintf("%s/%s", ValidatorsKey, addr)
}

// SetValidator sets a validator into the tree
func (s *StateTree) SetValidator(addr string, v *Validator) error {
	return s.Set(s.validatorKey(addr), v)
}

// IterateValidators iterates over all the validators present in the tree
func (s *StateTree) IterateValidators(fn func(addr string, v *Validator)) {
	start := []byte(ValidatorsKey)
	end := append(start, 0xff)
	s.tree.IterateRange(start, end, true, func(key, val []byte) bool {
		addr := strings.TrimPrefix(string(key), ValidatorsKey+"/")

		var v Validator
		if err := s.codec.Decode(val, &v); err != nil {
			return false
		}

		fn(addr, &v)
		return false
	})
}
