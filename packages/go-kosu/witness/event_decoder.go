package witness

import (
	"errors"
	"fmt"
	"math/big"

	"github.com/ParadigmFoundation/kosu-monorepo/packages/go-kosu/store"
)

// EventPosterRegistryUpdate represent a decoded PosterRegistryUpdate event
type EventPosterRegistryUpdate struct {
	Amount  *big.Int
	Address store.Address
}

// EventValidatorRegistryUpdate represent a decoded ValidatorRegistryUpdate event
type EventValidatorRegistryUpdate struct {
	Amount    *big.Int
	Address   store.Address
	PublicKey []byte
}

// DecodeKosuEvent tries to decode an EventEmitterKosuEvent from the Ethereum blockchain
func DecodeKosuEvent(ev *EventEmitterKosuEvent, t interface{}) error {
	if ev.Data == nil {
		return errors.New("data field is empty")
	}

	switch ev.EventType {
	case "PosterRegistryUpdate":
		dst, ok := t.(*EventPosterRegistryUpdate)
		if !ok {
			return fmt.Errorf("invalid type '%T' for PosterRegistryUpdate event", t)
		}
		return decodePosterRegistryUpdate(ev, dst)
	case "ValidatorRegistryUpdate":
		dst, ok := t.(*EventValidatorRegistryUpdate)
		if !ok {
			return fmt.Errorf("invalid type '%T' for ValidatorRegistryUpdate event", t)
		}
		return decodeValidatorRegistryUpdate(ev, dst)
	}

	return fmt.Errorf("don't know how to handle event '%s'", ev.EventType)
}

func newAddress(data [32]byte) (store.Address, error) {
	return store.NewAddress(data[12:])
}

func decodePosterRegistryUpdate(ev *EventEmitterKosuEvent, dst *EventPosterRegistryUpdate) error {
	address, err := newAddress(ev.Data[0])
	if err != nil {
		return err
	}
	dst.Address = address
	dst.Amount = big.NewInt(0).SetBytes(ev.Data[1][:])

	return nil
}

func decodeValidatorRegistryUpdate(ev *EventEmitterKosuEvent, dst *EventValidatorRegistryUpdate) error {
	address, err := newAddress(ev.Data[1])
	if err != nil {
		return err
	}
	dst.Address = address
	dst.PublicKey = ev.Data[0][:]
	dst.Amount = big.NewInt(0).SetBytes(ev.Data[2][:])
	return nil
}
