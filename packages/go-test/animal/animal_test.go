package animal

import "testing"

func TestNewAnimal(t *testing.T) {
	if _, err := NewAnimal("horace", "cow"); err != nil {
		t.Fatalf("should have allowed creation of cow")
	}

	if _, err := NewAnimal("horace", "horse"); err != nil {
		t.Fatalf("should have allowed creation of horse")
	}

	if _, err := NewAnimal("horace", "cat"); err != nil {
		t.Fatalf("should have allowed creation of cat")
	}

	if _, err := NewAnimal("horace", "dog"); err == nil {
		t.Fatalf("should not have allowed creation of dog")
	}

	if _, err := NewAnimal("horace", "bird"); err == nil {
		t.Fatalf("should not have allowed creation of bird")
	}
}
