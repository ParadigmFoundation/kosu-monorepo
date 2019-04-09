package silly

import (
	"testing"
)

func TestSillyStruct(t *testing.T) {
	silly, err1 := NewSillyStruct("henryharder", 18)
	if err1 != nil {
		t.Fatalf("Failed to create silly struct: %v", err1)
	}
	t.Logf("SillyStruct: %v", silly)

	_, err2 := NewSillyStruct("sho", 12)
	if err2 == nil {
		t.Fatalf("Should have returned error, got nil")
	}

	_, err3 := NewSillyStruct("long enough", -1)
	if err3 == nil {
		t.Fatalf("Should have returned error, got nil")
	}
}
