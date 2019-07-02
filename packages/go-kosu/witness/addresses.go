package witness

import (
	"fmt"
	"io/ioutil"
	"math/big"

	"github.com/tidwall/gjson"
)

var deployedAddressesPath = "./node_modules/@kosu/system-contracts/src/deployedAddresses.json"

// GetContractAddress returns the contract address given the Ethereum NetworkID and the contract name
func GetContractAddress(nID *big.Int, contract string) (string, error) {
	buf, err := ioutil.ReadFile(deployedAddressesPath)
	if err != nil {
		return "", err
	}

	query := fmt.Sprintf("%d.%s", nID.Uint64(), contract)
	res := gjson.GetBytes(buf, query)

	if !res.Exists() {
		return "", fmt.Errorf("could not find address for Contract:%s @ NetworkID:%d", contract, nID.Uint64())
	}

	return res.String(), nil
}
