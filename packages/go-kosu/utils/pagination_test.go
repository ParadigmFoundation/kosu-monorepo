package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type slice []string

func (s slice) Len() int { return len(s) }

var _ Paginator = slice{}

func AssertPagination(t *testing.T, s slice, page, perpage, i, j int) {
	a, b := Paginate(s, page, perpage)
	assert.Equal(t, i, a, "given page    %d, expect %d, got %d", page, i, a)
	assert.Equal(t, j, b, "given perpage %d, expect %d, got %d", perpage, j, b)
}

func AssertFullSet(t *testing.T, s slice, page, perpage int) {
	AssertPagination(t, s, page, perpage, 0, len(s))
}

func AssertEmpty(t *testing.T, s slice, page, perpage int) {
	AssertPagination(t, s, page, perpage, 0, 0)
}

func TestPagination(t *testing.T) {
	s := slice{"0", "1", "2", "3", "4", "5", "6", "7", "8"}

	t.Run("PerPage is Zero", func(t *testing.T) {
		AssertFullSet(t, s, 0, 0)
	})

	t.Run("PerPageTooBig", func(t *testing.T) {
		AssertFullSet(t, s, 0, 99)
	})

	t.Run("PageTooBig", func(t *testing.T) {
		AssertEmpty(t, s, 99, 1)
		AssertEmpty(t, s, 99999, 1)
	})

	t.Run("Pages", func(t *testing.T) {
		AssertPagination(t, s,
			0, 6,
			0, 6,
		)

		AssertPagination(t, s,
			1, 6,
			6, len(s),
		)
	})

	t.Run("Empty collection", func(t *testing.T) {
		AssertEmpty(t, slice{}, 0, 0)
	})
}
