package animal

import (
	"errors"
)

var (
	allowed = map[string]bool{
		"cow":   true,
		"horse": true,
		"cat":   true,
		"dog":   true,
		"bird":  true,
	}
)

// Animal represents a simple animal
type Animal struct {
	name    string
	species string
	age     uint
	alive   bool
}

// NewAnimal creates a new animal instance with specified name and type
func NewAnimal(species string, name string) (*Animal, error) {
	if !allowed[species] {
		return nil, errors.New("invalid species")
	}
	return &Animal{
		name:    name,
		age:     0,
		species: species,
		alive:   true,
	}, nil
}

// SayName returns the animals name
func (a *Animal) SayName() (name string) {
	name = a.name
	return name
}

// SaySpecies returns the animals species
func (a *Animal) SaySpecies() (species string) {
	species = a.species
	return species
}

// IsAlive returns true if the animal is alive
func (a *Animal) IsAlive() (living bool) {
	living = a.alive
	return living
}

// HowOld returns the animals age
func (a *Animal) HowOld() (age uint) {
	age = a.age
	return age
}

// Grow increases the animals age by one
func (a *Animal) Grow() (err error) {
	if a.alive != true {
		return errors.New("animal that is dead cannot grow")
	}
	a.age++
	return nil
}

// Kill kills an animal
func (a *Animal) Kill() (err error) {
	if a.alive != true {
		return errors.New("cannot kill what is already dead")
	}
	a.alive = false
	return nil
}
