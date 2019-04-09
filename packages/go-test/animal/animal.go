package animal

import (
	"errors"
)

// Animal is an animal
type Animal struct {
	Name string
	Age  uint
	Type string
}

// NewAnimal creates a new animal
func NewAnimal(name string, species string) (*Animal, error) {
	types := map[string]bool{
		"cow":   true,
		"horse": true,
		"cat":   true,
		"dog":   false,
		"bird":  false,
	}

	if !types[species] {
		return nil, errors.New("invalid species")
	}
	return &Animal{Name: name, Age: 0, Type: species}, nil
}
