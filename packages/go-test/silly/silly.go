package silly

import (
	"crypto/sha256"
	"errors"
)

// SillyStruct is a silly struct
type SillyStruct struct {
	Name string
	Age  int
	Hash [32]byte
}

// NewSillyStruct creates a silly struct
func NewSillyStruct(name string, age int) (*SillyStruct, error) {
	if len(name) < 4 {
		return nil, errors.New("name is too short")
	}
	if age < 0 {
		return nil, errors.New("age is too young")
	}
	silly := SillyStruct{Name: name, Age: age}
	silly.generateHash()
	return &silly, nil
}

func (s *SillyStruct) generateHash() {
	bytes := []byte(s.Name)
	shasum := sha256.Sum256(bytes)
	s.Hash = shasum
}
