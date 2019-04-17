package animal

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNewAnimal(t *testing.T) {
	if _, err := NewAnimal("dog", "richard"); err != nil {
		t.Fatalf("should have allowed creation of dog")
	}

	if _, err := NewAnimal("cat", "richard"); err != nil {
		t.Fatalf("should have allowed creation of cat")
	}

	if _, err := NewAnimal("cow", "richard"); err != nil {
		t.Fatalf("should have allowed creation of cow")
	}

	if _, err := NewAnimal("bird", "richard"); err != nil {
		t.Fatalf("should have allowed creation of bird")
	}

	if _, err := NewAnimal("lizard", "richard"); err == nil {
		t.Fatalf("should not have allowed creation of lizard")
	}
}

func TestAnimalSaysName(t *testing.T) {
	name := "richard"
	species := "dog"

	dog, err := NewAnimal(species, name)
	require.Nil(t, err, "should have allowed creation of richard")

	saidName := dog.SayName()
	require.Equal(t, name, saidName)
}

func TestAnimalSaysSpecies(t *testing.T) {
	name := "richard"
	species := "dog"

	richard, err := NewAnimal(species, name)
	require.Nil(t, err, "should have allowed creation of richard")

	saidSpecies := richard.SaySpecies()
	require.Equal(t, species, saidSpecies)
}

func TestAnimalIsAlive(t *testing.T) {
	richard, err := NewAnimal("dog", "richard")
	require.Nil(t, err, "should have allowed creation of richard")

	isAlive := richard.IsAlive()
	require.Equal(t, true, isAlive, "richard should have been alive")
}

func TestAnimalAge(t *testing.T) {
	richard, err := NewAnimal("dog", "richard")
	require.Nil(t, err, "should have allowed creation of richard")

	initialAge := richard.HowOld()
	require.Equal(t, uint(0), initialAge, "richards age should have been 0")

	// Test that richard ages one year each time we .Grow him
	err = richard.Grow()
	require.Nil(t, err, "should have been able to grow richard")

	newAge := richard.HowOld()
	require.Equal(t, uint(1), newAge, "richards age should have been 1")
}

func TestKillAnimal(t *testing.T) {
	richard, err := NewAnimal("dog", "richard")
	require.Nil(t, err, "should have allowed creation of richard")

	isAlive := richard.IsAlive()
	require.Equal(t, true, isAlive, "richard should have been alive")

	// We must kill Richard :(
	err = richard.Kill()
	require.Nil(t, err, "should have been able to kill richard")

	isAliveNow := richard.IsAlive()
	require.Equal(t, false, isAliveNow, "richard should have been dead now")

	err = richard.Kill()
	require.NotNil(t, err, "should not have been able to kill richard again")

	err = richard.Grow()
	require.NotNil(t, err, "should not have been able to grow dead richard")
}
