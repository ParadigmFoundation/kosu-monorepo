package types

// Route name definitions

func (tx *Transaction_Witness) Route() string   { return "witness" }   //nolint
func (tx *Transaction_Rebalance) Route() string { return "rebalance" } //nolint
func (tx *Transaction_Order) Route() string     { return "order" }     //nolint

// Route return the route representation of the underlying SignedTransaction Tx.
// if the route can't be resolved, an empty string is returned.
func (tx *SignedTransaction) Route() string {
	data, ok := tx.GetTx().GetData().(interface {
		Route() string
	})

	if ok {
		return data.Route()
	}

	return ""
}
