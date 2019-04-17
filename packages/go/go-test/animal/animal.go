package animal

import (
	"errors"
)

// Explicitly only allow these types of Animals to be created
var allowed = map[string]bool{
	"cow":   true,
	"horse": true,
	"cat":   true,
	"dog":   true,
	"bird":  true,
}

// Animal represents a simple animal
type Animal struct {
	Name    string
	Species string
	Age     uint
	Alive   bool
}

// NewAnimal creates a new animal instance with specified name and type
func NewAnimal(species string, name string) (*Animal, error) {
	if !allowed[species] {
		return nil, errors.New("invalid species")
	}
	return &Animal{
		Name:    name,
		Age:     0,
		Species: species,
		Alive:   true,
	}, nil
}

// SayName returns the animals name
func (a Animal) SayName() (name string) {
	name = a.Name
	return
}

// SaySpecies returns the animals species
func (a Animal) SaySpecies() (species string) {
	species = a.Species
	return
}

// IsAlive returns true if the animal is alive
func (a Animal) IsAlive() (living bool) {
	living = a.Alive
	return
}

// HowOld returns the animals age
func (a Animal) HowOld() (age uint) {
	age = a.Age
	return
}

// Grow increases the animals age by one
func (a *Animal) Grow() (err error) {
	if a.Alive != true {
		return errors.New("animal that is dead cannot grow")
	}
	a.Age++
	return nil
}

// Kill kills an animal
func (a *Animal) Kill() (err error) {
	if a.Alive != true {
		return errors.New("cannot kill what is already dead")
	}
	a.Alive = false
	return nil
}
