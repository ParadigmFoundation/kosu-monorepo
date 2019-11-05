package types

import (
	"crypto"
	"math/rand"
	"time"

	"golang.org/x/crypto/ed25519"

	"github.com/tendermint/tendermint/crypto/tmhash"
)

var randReader = rand.New(
	rand.NewSource(
		time.Now().Unix(),
	),
)

// NewKeyPair returns a new public/private key pair.
func NewKeyPair() ([]byte, []byte, error) {
	return ed25519.GenerateKey(randReader)
}

// NewSignedTransactionFromBytes decodes and verify a raw Tx, usually coming from a TM request.
func NewSignedTransactionFromBytes(raw []byte) (*SignedTransaction, error) {
	stx := &SignedTransaction{}
	if err := DecodeTx(raw, stx); err != nil {
		return nil, err
	}

	valid, err := stx.Verify()
	if err != nil {
		return nil, err
	}

	if !valid {
		return nil, ErrInvalidSignature
	}

	return stx, nil
}

// SignedTransaction returns the Signed version of the transaction.
func (tx *Transaction) SignedTransaction(priv []byte) (*SignedTransaction, error) {
	buf, err := EncodeTx(tx)
	if err != nil {
		return nil, err
	}

	sig, err := ed25519.PrivateKey(priv).Sign(randReader, buf, crypto.Hash(0))
	if err != nil {
		return nil, err
	}

	pub := ed25519.PrivateKey(priv).Public().(ed25519.PublicKey)
	return &SignedTransaction{
		Tx: tx,
		Proof: &Proof{
			PublicKey: pub,
			Signature: sig,
		},
	}, nil
}

// Verify verifies that the proof is valid
func (tx *SignedTransaction) Verify() (bool, error) {
	buf, err := EncodeTx(tx.Tx)
	if err != nil {
		return false, err
	}

	return ed25519.Verify(tx.Proof.PublicKey, buf, tx.Proof.Signature), nil
}

// NodeID of the Transaction signer
func (tx *SignedTransaction) NodeID() NodeID {
	return tmhash.SumTruncated(tx.Proof.PublicKey)
}
