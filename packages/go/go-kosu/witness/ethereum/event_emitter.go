// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package witness

import (
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = abi.U256
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// EventEmitterABI is the input ABI used to generate the binding from.
const EventEmitterABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"eventType\",\"type\":\"string\"},{\"name\":\"data\",\"type\":\"bytes32[]\"}],\"name\":\"emitEvent\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"auth\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"eventType\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"data\",\"type\":\"bytes32[]\"}],\"name\":\"ParadigmEvent\",\"type\":\"event\"}]"

// EventEmitter is an auto generated Go binding around an Ethereum contract.
type EventEmitter struct {
	EventEmitterCaller     // Read-only binding to the contract
	EventEmitterTransactor // Write-only binding to the contract
	EventEmitterFilterer   // Log filterer for contract events
}

// EventEmitterCaller is an auto generated read-only Go binding around an Ethereum contract.
type EventEmitterCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EventEmitterTransactor is an auto generated write-only Go binding around an Ethereum contract.
type EventEmitterTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EventEmitterFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type EventEmitterFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// EventEmitterSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type EventEmitterSession struct {
	Contract     *EventEmitter     // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// EventEmitterCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type EventEmitterCallerSession struct {
	Contract *EventEmitterCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts       // Call options to use throughout this session
}

// EventEmitterTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type EventEmitterTransactorSession struct {
	Contract     *EventEmitterTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts       // Transaction auth options to use throughout this session
}

// EventEmitterRaw is an auto generated low-level Go binding around an Ethereum contract.
type EventEmitterRaw struct {
	Contract *EventEmitter // Generic contract binding to access the raw methods on
}

// EventEmitterCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type EventEmitterCallerRaw struct {
	Contract *EventEmitterCaller // Generic read-only contract binding to access the raw methods on
}

// EventEmitterTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type EventEmitterTransactorRaw struct {
	Contract *EventEmitterTransactor // Generic write-only contract binding to access the raw methods on
}

// NewEventEmitter creates a new instance of EventEmitter, bound to a specific deployed contract.
func NewEventEmitter(address common.Address, backend bind.ContractBackend) (*EventEmitter, error) {
	contract, err := bindEventEmitter(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &EventEmitter{EventEmitterCaller: EventEmitterCaller{contract: contract}, EventEmitterTransactor: EventEmitterTransactor{contract: contract}, EventEmitterFilterer: EventEmitterFilterer{contract: contract}}, nil
}

// NewEventEmitterCaller creates a new read-only instance of EventEmitter, bound to a specific deployed contract.
func NewEventEmitterCaller(address common.Address, caller bind.ContractCaller) (*EventEmitterCaller, error) {
	contract, err := bindEventEmitter(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &EventEmitterCaller{contract: contract}, nil
}

// NewEventEmitterTransactor creates a new write-only instance of EventEmitter, bound to a specific deployed contract.
func NewEventEmitterTransactor(address common.Address, transactor bind.ContractTransactor) (*EventEmitterTransactor, error) {
	contract, err := bindEventEmitter(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &EventEmitterTransactor{contract: contract}, nil
}

// NewEventEmitterFilterer creates a new log filterer instance of EventEmitter, bound to a specific deployed contract.
func NewEventEmitterFilterer(address common.Address, filterer bind.ContractFilterer) (*EventEmitterFilterer, error) {
	contract, err := bindEventEmitter(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &EventEmitterFilterer{contract: contract}, nil
}

// bindEventEmitter binds a generic wrapper to an already deployed contract.
func bindEventEmitter(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(EventEmitterABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_EventEmitter *EventEmitterRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _EventEmitter.Contract.EventEmitterCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_EventEmitter *EventEmitterRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _EventEmitter.Contract.EventEmitterTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_EventEmitter *EventEmitterRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _EventEmitter.Contract.EventEmitterTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_EventEmitter *EventEmitterCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _EventEmitter.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_EventEmitter *EventEmitterTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _EventEmitter.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_EventEmitter *EventEmitterTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _EventEmitter.Contract.contract.Transact(opts, method, params...)
}

// EmitEvent is a paid mutator transaction binding the contract method 0x27902401.
//
// Solidity: function emitEvent(string eventType, bytes32[] data) returns()
func (_EventEmitter *EventEmitterTransactor) EmitEvent(opts *bind.TransactOpts, eventType string, data [][32]byte) (*types.Transaction, error) {
	return _EventEmitter.contract.Transact(opts, "emitEvent", eventType, data)
}

// EmitEvent is a paid mutator transaction binding the contract method 0x27902401.
//
// Solidity: function emitEvent(string eventType, bytes32[] data) returns()
func (_EventEmitter *EventEmitterSession) EmitEvent(eventType string, data [][32]byte) (*types.Transaction, error) {
	return _EventEmitter.Contract.EmitEvent(&_EventEmitter.TransactOpts, eventType, data)
}

// EmitEvent is a paid mutator transaction binding the contract method 0x27902401.
//
// Solidity: function emitEvent(string eventType, bytes32[] data) returns()
func (_EventEmitter *EventEmitterTransactorSession) EmitEvent(eventType string, data [][32]byte) (*types.Transaction, error) {
	return _EventEmitter.Contract.EmitEvent(&_EventEmitter.TransactOpts, eventType, data)
}

// EventEmitterParadigmEventIterator is returned from FilterParadigmEvent and is used to iterate over the raw logs and unpacked data for ParadigmEvent events raised by the EventEmitter contract.
type EventEmitterParadigmEventIterator struct {
	Event *EventEmitterParadigmEvent // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *EventEmitterParadigmEventIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(EventEmitterParadigmEvent)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(EventEmitterParadigmEvent)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *EventEmitterParadigmEventIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *EventEmitterParadigmEventIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// EventEmitterParadigmEvent represents a ParadigmEvent event raised by the EventEmitter contract.
type EventEmitterParadigmEvent struct {
	EventType string
	Data      [][32]byte
	Raw       types.Log // Blockchain specific contextual infos
}

// FilterParadigmEvent is a free log retrieval operation binding the contract event 0xb68836208a735161f1390dda0ff45fa887902bfcc41993796211c40b417ad48c.
//
// Solidity: event ParadigmEvent(string eventType, bytes32[] data)
func (_EventEmitter *EventEmitterFilterer) FilterParadigmEvent(opts *bind.FilterOpts) (*EventEmitterParadigmEventIterator, error) {

	logs, sub, err := _EventEmitter.contract.FilterLogs(opts, "ParadigmEvent")
	if err != nil {
		return nil, err
	}
	return &EventEmitterParadigmEventIterator{contract: _EventEmitter.contract, event: "ParadigmEvent", logs: logs, sub: sub}, nil
}

// WatchParadigmEvent is a free log subscription operation binding the contract event 0xb68836208a735161f1390dda0ff45fa887902bfcc41993796211c40b417ad48c.
//
// Solidity: event ParadigmEvent(string eventType, bytes32[] data)
func (_EventEmitter *EventEmitterFilterer) WatchParadigmEvent(opts *bind.WatchOpts, sink chan<- *EventEmitterParadigmEvent) (event.Subscription, error) {

	logs, sub, err := _EventEmitter.contract.WatchLogs(opts, "ParadigmEvent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(EventEmitterParadigmEvent)
				if err := _EventEmitter.contract.UnpackLog(event, "ParadigmEvent", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}
