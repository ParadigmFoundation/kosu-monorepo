# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [types.proto](#types.proto)
    - [BigInt](#kosu.BigInt)
    - [ConsensusParams](#kosu.ConsensusParams)
    - [OrderArgument](#kosu.OrderArgument)
    - [OrderArguments](#kosu.OrderArguments)
    - [Poster](#kosu.Poster)
    - [Proof](#kosu.Proof)
    - [RoundInfo](#kosu.RoundInfo)
    - [SignedTransaction](#kosu.SignedTransaction)
    - [Transaction](#kosu.Transaction)
    - [TransactionOrder](#kosu.TransactionOrder)
    - [TransactionOrder.MakerValuesEntry](#kosu.TransactionOrder.MakerValuesEntry)
    - [TransactionRebalance](#kosu.TransactionRebalance)
    - [TransactionWitness](#kosu.TransactionWitness)
    - [Validator](#kosu.Validator)
  
    - [TransactionWitness.Subject](#kosu.TransactionWitness.Subject)
  
  
  

- [Scalar Value Types](#scalar-value-types)



<a name="types.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## types.proto



<a name="kosu.BigInt"></a>

### BigInt
BigInt


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| value | [bytes](#bytes) |  |  |






<a name="kosu.ConsensusParams"></a>

### ConsensusParams
ConsensusParams


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| FinalityThreshold | [uint32](#uint32) |  |  |
| PeriodLimit | [uint64](#uint64) |  |  |
| PeriodLength | [uint32](#uint32) |  |  |
| MaxOrderBytes | [uint32](#uint32) |  |  |
| ConfirmationThreshold | [uint64](#uint64) |  |  |






<a name="kosu.OrderArgument"></a>

### OrderArgument



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| name | [string](#string) |  |  |
| datatype | [string](#string) |  |  |
| signatureFields | [int64](#int64) | repeated |  |






<a name="kosu.OrderArguments"></a>

### OrderArguments



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| maker | [OrderArgument](#kosu.OrderArgument) | repeated |  |
| taker | [OrderArgument](#kosu.OrderArgument) | repeated |  |






<a name="kosu.Poster"></a>

### Poster
Poster


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| balance | [BigInt](#kosu.BigInt) |  |  |
| limit | [uint64](#uint64) |  |  |






<a name="kosu.Proof"></a>

### Proof
Proof is used to sign a Transaction and produce a SignedTransaction.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| public_key | [bytes](#bytes) |  |  |
| signature | [bytes](#bytes) |  |  |






<a name="kosu.RoundInfo"></a>

### RoundInfo
RoundInfo


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| number | [uint64](#uint64) |  |  |
| starts_at | [uint64](#uint64) |  |  |
| ends_at | [uint64](#uint64) |  |  |
| limit | [uint64](#uint64) |  |  |






<a name="kosu.SignedTransaction"></a>

### SignedTransaction
SignedTransaction.

This is the only Transaction accepted by the node. It&#39;s composed by a Transaction and it&#39;s Proof.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| proof | [Proof](#kosu.Proof) |  |  |
| tx | [Transaction](#kosu.Transaction) |  |  |






<a name="kosu.Transaction"></a>

### Transaction
Transaction


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| rebalance | [TransactionRebalance](#kosu.TransactionRebalance) |  |  |
| witness | [TransactionWitness](#kosu.TransactionWitness) |  |  |
| order | [TransactionOrder](#kosu.TransactionOrder) |  |  |






<a name="kosu.TransactionOrder"></a>

### TransactionOrder
TransactionOrder contains a signed order from a poster, and modifies their remaining period limit.

This transaction can originate from anywhere, so long as the address recovered from the poster
signature has a non-zero balance of Kosu tokens (they are a poster).


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subContract | [string](#string) |  |  |
| maker | [string](#string) |  |  |
| arguments | [OrderArguments](#kosu.OrderArguments) |  |  |
| makerValues | [TransactionOrder.MakerValuesEntry](#kosu.TransactionOrder.MakerValuesEntry) | repeated |  |
| makerSignature | [string](#string) |  |  |
| posterSignature | [string](#string) |  |  |






<a name="kosu.TransactionOrder.MakerValuesEntry"></a>

### TransactionOrder.MakerValuesEntry



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  |  |
| value | [string](#string) |  |  |






<a name="kosu.TransactionRebalance"></a>

### TransactionRebalance
TransactionRebalance


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| round_info | [RoundInfo](#kosu.RoundInfo) |  |  |






<a name="kosu.TransactionWitness"></a>

### TransactionWitness
TransactionWitness performs state modification of Stake Event transactions (modify staker&#39;s balance).
This transaction should be originated from the validator nodes.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| subject | [TransactionWitness.Subject](#kosu.TransactionWitness.Subject) |  |  |
| amount | [BigInt](#kosu.BigInt) |  |  |
| block | [uint64](#uint64) |  | Block number of event |
| address | [string](#string) |  | Ethereum address of validator/poster |
| public_key | [bytes](#bytes) |  | Tendermint ed25519 key of validator (base64 enc ) |
| id | [bytes](#bytes) |  | Hash of event data |
| confirmations | [uint64](#uint64) |  |  |






<a name="kosu.Validator"></a>

### Validator
Validator


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| balance | [BigInt](#kosu.BigInt) |  | balance in registry contract |
| power | [int64](#int64) |  | vote power on tendermint chain |
| publicKey | [bytes](#bytes) |  | raw 32 byte public key |
| ethAccount | [string](#string) |  |  |
| firstVote | [int64](#int64) |  |  |
| lastVoted | [int64](#int64) |  |  |
| lastProposed | [int64](#int64) |  |  |
| totalVotes | [int64](#int64) |  |  |
| active | [bool](#bool) |  | true if voted on last block |
| genesis | [bool](#bool) |  | true if val was in genesis.json = 5; |
| applied | [bool](#bool) |  | true if a) in genesis or b) through endblock = 5; |





 


<a name="kosu.TransactionWitness.Subject"></a>

### TransactionWitness.Subject


| Name | Number | Description |
| ---- | ------ | ----------- |
| POSTER | 0 |  |
| VALIDATOR | 1 |  |


 

 

 



## Scalar Value Types

| .proto Type | Notes | C++ Type | Java Type | Python Type |
| ----------- | ----- | -------- | --------- | ----------- |
| <a name="double" /> double |  | double | double | float |
| <a name="float" /> float |  | float | float | float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long |
| <a name="bool" /> bool |  | bool | boolean | boolean |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str |

