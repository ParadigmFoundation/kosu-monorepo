package witness

import (
	"fmt"
	"math/big"

	"github.com/tidwall/gjson"
)

const deployedAddressesPath = "../node_modules/@kosu/migrations/src/deployedAddresses.json"

// GetContractAddress returns the contract address given the Ethereum NetworkID and the contract name
func GetContractAddress(nID *big.Int, contract string) (string, error) {
	buf, err := Asset(deployedAddressesPath)
	if err != nil {
		return "", err
	}

	query := fmt.Sprintf("%d.%s.%s", nID.Uint64(), contract, "contractAddress")
	res := gjson.GetBytes(buf, query)

	if !res.Exists() {
		return "", fmt.Errorf("could not find address for Contract:%s @ NetworkID:%d", contract, nID.Uint64())
	}

	return res.String(), nil
}
