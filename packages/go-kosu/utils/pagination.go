package utils

// Paginator is a type, typically a collection, that satisfies the Paginator interface can be paginated
// by the Paginate function
type Paginator interface {
	Len() int
}

// Paginate paginates. It call .Len() to defermine the collection size.
// If page is zero, the full set (0, p.Len()) is returned.
// If Page is too bit (out of range), (-1, -1) is returned.
func Paginate(p Paginator, page, perpage int) (int, int) {
	if perpage == 0 {
		return 0, p.Len()
	}

	offset := page * perpage
	end := offset + perpage
	if end > p.Len() {
		end = p.Len()
	}

	if offset > p.Len() {
		return 0, 0
	}

	return offset, end
}
