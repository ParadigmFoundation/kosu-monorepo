package store

import (
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"math/big"
	"paradigmcore/abci/types"
	"sync"
	"sync/atomic"
)

// RoundInfo is the persisted state of the RoundInfo
type RoundInfo struct {
	Number    uint64
	StartsAt  uint64
	EndsAt    uint64
	Limit     uint64
	LimitUsed uint64
}

// FromProto set the RoundInfo values from a RoundInfo ProtoBuf message
func (r *RoundInfo) FromProto(p *types.RoundInfo) {
	r.Number = p.GetNumber()
	r.StartsAt = p.GetStartsAt()
	r.EndsAt = p.GetEndsAt()
	r.Limit = p.GetLimit()
}

// ToProto set the RoundInfo ProtoBuf message values from a RoundInfo
func (r *RoundInfo) ToProto(p *types.RoundInfo) {
	p.Number = r.Number
	p.StartsAt = r.StartsAt
	p.EndsAt = r.EndsAt
	p.Limit = r.Limit
}

// RateLimits is the persisted state of the RateLimit ProtoBuf message
type RateLimits map[string]uint64

// FromProto .
func (r RateLimits) FromProto(limits ...*types.RateLimit) {
	for _, limit := range limits {
		r[limit.GetAddress()] = limit.GetLimit()
	}
}

// WitnessEvents .
type WitnessEvents map[string]*WitnessEvent

// WitnessEvent .
type WitnessEvent struct {
	Conf    uint32
	Address string
	Amount  *big.Int
}

// Poster .
type Poster struct {
	Balance *big.Int
	Limit   uint64
}

// ConsensusParams are the parameters required for validators within a network to reach consensus on valid transactions.
type ConsensusParams struct {
	FinalityThreshold     uint32
	PeriodLimit           uint32
	PeriodLength          uint32
	MaxOrderBytes         uint32
	ConfirmationThreshold uint32
}

// State .
type State struct {
	// roundInfo contains data necessary to track and update rebalance rounds.
	RoundInfo RoundInfo

	// events stores pending (unconfirmed) events attested to by validators running Witness components.
	events     map[uint64]WitnessEvents
	eventsLock sync.RWMutex

	// posters keep track for Account and balance for 'posters'.
	posters     map[string]*Poster
	postersLock sync.RWMutex

	// lastEvent stores the height of the Ethereum blockchain at which the last event was applied in-state.
	LastEvent uint64

	// confirmationThreshold is used to apply certain Txs based on their confirmations
	ConsensusParams ConsensusParams
}

// NewState returns a new empty State
func NewState() *State {
	return &State{
		posters: make(map[string]*Poster),
		events:  make(map[uint64]WitnessEvents),
	}
}

type element struct {
	key string
	val interface{}
}

func (s *State) elements() []element {
	return []element{
		{roundInfoKey, &s.RoundInfo},
		{lastEventKey, &s.LastEvent},
		{consensusParamsKey, &s.ConsensusParams},
	}
}

// UpdateFromTree updates the state data from a given tree.
func (s *State) UpdateFromTree(tree *StateTree) error {
	for _, elem := range s.elements() {
		if err := tree.Get(elem.key, elem.val); err != nil {
			return err
		}
	}

	fn := func(block uint64, id string, w *WitnessEvent) {
		if s.events[block] == nil {
			s.events[block] = WitnessEvents{}
		}

		s.events[block][id] = w
	}

	s.eventsLock.Lock()
	tree.IterateEvents(fn)
	s.eventsLock.Unlock()

	return nil
}

// PersistToTree persists the state into a tree. You still need to call Commit() in the target tree.
func (s *State) PersistToTree(tree *StateTree) error {
	for _, elem := range s.elements() {
		if err := tree.Set(elem.key, elem.val); err != nil {
			return err
		}
	}

	// TODO: clear previous persisted events in the tree to avoid growing forever.
	s.eventsLock.RLock()
	defer s.eventsLock.RUnlock()
	for block, events := range s.events {
		for id, event := range events {
			if err := tree.SetEvent(block, id, event); err != nil {
				return err
			}
		}
	}

	s.postersLock.RLock()
	for addr, poster := range s.posters {
		log.Printf("addr: %s - %+v", addr, poster)
	}
	defer s.postersLock.RUnlock()

	return nil
}

// PushTransactionWitness pushes a TransactionWitness to the witness event stack.
// If the event already exists, it will increase the .Confirmation number
func (s *State) PushTransactionWitness(tx *types.TransactionWitness) error {
	if s.LastEvent >= tx.Block {
		return errors.New("transaction is older than the recorded state")
	}

	if tx.Amount == nil {
		tx.Amount = types.NewBigInt(0)
	}

	event := s.addTxWitnessToEvents(tx)

	// We don't have enough confirmations to apply this event
	if s.ConsensusParams.ConfirmationThreshold > event.Conf {
		return nil
	}

	poster := &Poster{
		Balance: tx.Amount.BigInt(),
	}
	s.updatePosters(tx.Address, poster)

	s.deleteTxWitnessEvent(tx.Block, tx.Id)

	s.LastEvent = tx.Block

	return nil
}

func (s *State) addTxWitnessToEvents(tx *types.TransactionWitness) *WitnessEvent {
	s.eventsLock.Lock()
	defer s.eventsLock.Unlock()

	id := hex.EncodeToString(tx.Id)
	if evts, ok := s.events[tx.Block]; ok {
		// Tx has already been pushed. Increment the Confirmations.
		if found, ok := evts[id]; ok {
			found.Conf++
			return found
		}
	} else {
		s.events[tx.Block] = make(WitnessEvents)
	}

	// This Tx has not been seen yet. Push it to the Events list.
	var amount *big.Int
	if tx.Amount == nil {
		amount = big.NewInt(0)
	} else {
		amount = tx.Amount.BigInt()
	}
	ev := &WitnessEvent{
		Address: tx.Address,
		Amount:  amount,
		Conf:    1,
	}
	s.events[tx.Block][id] = ev
	return ev
}

// updatePosters can either:
// - adds a poster to the posters map if not found
// - update its balance if found in the map
// if balance is zero
func (s *State) updatePosters(addr string, p *Poster) {
	s.postersLock.Lock()
	defer s.postersLock.Unlock()

	if found, ok := s.posters[addr]; ok {
		found.Balance = p.Balance
	} else {
		s.posters[addr] = p
	}

	if p.Balance.Cmp(big.NewInt(0)) == 0 {
		delete(s.posters, addr)
	}
}

// deleteTxWitnessEvent deletes an event from the events map and deletes the map if empty
func (s *State) deleteTxWitnessEvent(block uint64, id []byte) {
	s.eventsLock.Lock()
	defer s.eventsLock.Unlock()

	evts, ok := s.events[block]
	if !ok {
		return
	}

	stringID := hex.EncodeToString(id)
	delete(evts, stringID)

	if len(evts) == 0 {
		delete(s.events, block)
	}
}

// IterateWitnessEventsForBlock iterates over the events for a given block.
// If the handler returns false, the executio will be stopped.
func (s *State) IterateWitnessEventsForBlock(block uint64, fn func(id []byte, ev *WitnessEvent) bool) error {
	s.eventsLock.RLock()
	defer s.eventsLock.RUnlock()

	evts, ok := s.events[block]
	if !ok {
		return fmt.Errorf("block %d was not found", block)
	}

	for id, ev := range evts {
		bytesID, err := hex.DecodeString(id)
		if err != nil {
			return err
		}
		if !fn(bytesID, ev) {
			break
		}
	}

	return nil
}

// UpdateConfirmationThreshold sets a confirmation threshold as n*(2/3).
// This threshold is used to apply certain transactions.
func (s *State) UpdateConfirmationThreshold(n uint32) {
	if n > 1 {
		n = 2 * (n / 3)
	}
	atomic.StoreUint32(&s.ConsensusParams.ConfirmationThreshold, n)
}
