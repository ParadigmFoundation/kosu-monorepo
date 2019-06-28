package store

// Address represents an Ethereum address
type Address [20]byte

// NewAddress returns a new Address provided raw bytes
func NewAddress(bytes []byte) (Address, error) {
	a := Address{}
	if len(bytes) != len(a) {
		return Address{}, ErrInvalidLength
	}

	copy(a[:], bytes)
	return a, nil
}

// MustNewAddress is analogue to NewAddress panicking on error
func MustNewAddress(bytes []byte) Address {
	addr, err := NewAddress(bytes)
	if err != nil {
		panic(err)
	}

	return addr
}

// NewAddressFromString returns a new Address provided a string optionally prefixed with `0x`
func NewAddressFromString(s string) (Address, error) {
	bytes, err := NewHexBytesFromString(s)
	if err != nil {
		return Address{}, err
	}

	return NewAddress(bytes)
}

// MustNewAddressString is analogue to NewAddressString panicking on error
func MustNewAddressString(s string) Address {
	addr, err := NewAddressFromString(s)
	if err != nil {
		panic(err)
	}

	return addr
}

// Bytes returns the raw []byte representation of the Address
func (a Address) Bytes() []byte  { return HexBytes(a[:]) }
func (a Address) String() string { return HexBytes(a[:]).String() }

// UnmarshalJSON implements the json.Unmarshaler interface
func (a *Address) UnmarshalJSON(bytes []byte) error { return HexBytes(a[:]).UnmarshalJSON(bytes) }

// MarshalJSON implements the json.Marshaler interface
func (a *Address) MarshalJSON() ([]byte, error) { return HexBytes(a[:]).MarshalJSON() }
