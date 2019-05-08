# Protocol Documentation

<a name="top"></a>

## Table of Contents

-   [types.proto](#types.proto)

    -   [BigInt](#types.BigInt)
    -   [Poster](#types.Poster)
    -   [Proof](#types.Proof)
    -   [RateLimit](#types.RateLimit)
    -   [RoundInfo](#types.RoundInfo)
    -   [SignedTransaction](#types.SignedTransaction)
    -   [Transaction](#types.Transaction)
    -   [TransactionRebalance](#types.TransactionRebalance)
    -   [TransactionWitness](#types.TransactionWitness)

    -   [TransactionWitness.Subject](#types.TransactionWitness.Subject)

*   [Scalar Value Types](#scalar-value-types)

<a name="types.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## types.proto

<a name="types.BigInt"></a>

### BigInt

| Field | Type            | Label | Description |
| ----- | --------------- | ----- | ----------- |
| value | [bytes](#bytes) |       |             |

<a name="types.Poster"></a>

### Poster

| Field       | Type                    | Label | Description  |
| ----------- | ----------------------- | ----- | ------------ |
| balance     | [BigInt](#types.BigInt) |       | TODO: bignum |
| orderLimit  | [uint64](#uint64)       |       |              |
| streamLimit | [uint64](#uint64)       |       |              |

<a name="types.Proof"></a>

### Proof

| Field      | Type            | Label | Description |
| ---------- | --------------- | ----- | ----------- |
| public_key | [bytes](#bytes) |       |             |
| signature  | [bytes](#bytes) |       |             |

<a name="types.RateLimit"></a>

### RateLimit

| Field   | Type              | Label | Description |
| ------- | ----------------- | ----- | ----------- |
| address | [string](#string) |       |             |
| limit   | [uint64](#uint64) |       |             |

<a name="types.RoundInfo"></a>

### RoundInfo

| Field     | Type              | Label | Description |
| --------- | ----------------- | ----- | ----------- |
| number    | [uint64](#uint64) |       |             |
| starts_at | [uint64](#uint64) |       |             |
| ends_at   | [uint64](#uint64) |       |             |
| limit     | [uint64](#uint64) |       |             |

<a name="types.SignedTransaction"></a>

### SignedTransaction

Transactions

| Field | Type                              | Label | Description |
| ----- | --------------------------------- | ----- | ----------- |
| proof | [Proof](#types.Proof)             |       |             |
| tx    | [Transaction](#types.Transaction) |       |             |

<a name="types.Transaction"></a>

### Transaction

| Field     | Type                                                | Label | Description |
| --------- | --------------------------------------------------- | ----- | ----------- |
| rebalance | [TransactionRebalance](#types.TransactionRebalance) |       |             |
| witness   | [TransactionWitness](#types.TransactionWitness)     |       |             |

<a name="types.TransactionRebalance"></a>

### TransactionRebalance

| Field      | Type                          | Label    | Description |
| ---------- | ----------------------------- | -------- | ----------- |
| limits     | [RateLimit](#types.RateLimit) | repeated |             |
| round_info | [RoundInfo](#types.RoundInfo) |          |             |

<a name="types.TransactionWitness"></a>

### TransactionWitness

TransactionWitness performs state modification of Stake Event transactions (modify staker&#39;s balance).
This transaction should be originated from the validator nodes.

| Field      | Type                                                            | Label | Description                                       |
| ---------- | --------------------------------------------------------------- | ----- | ------------------------------------------------- |
| subject    | [TransactionWitness.Subject](#types.TransactionWitness.Subject) |       |                                                   |
| amount     | [BigInt](#types.BigInt)                                         |       |                                                   |
| block      | [uint64](#uint64)                                               |       | Block number of event                             |
| address    | [string](#string)                                               |       | Ethereum address of validator/poster              |
| public_key | [bytes](#bytes)                                                 |       | Tendermint ed25519 key of validator (base64 enc ) |
| id         | [bytes](#bytes)                                                 |       | Hash of event data                                |

<a name="types.TransactionWitness.Subject"></a>

### TransactionWitness.Subject

| Name      | Number | Description |
| --------- | ------ | ----------- |
| POSTER    | 0      |             |
| VALIDATOR | 1      |             |

## Scalar Value Types

| .proto Type                    | Notes                                                                                                                                           | C++ Type | Java Type  | Python Type |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ----------- |
| <a name="double" /> double     |                                                                                                                                                 | double   | double     | float       |
| <a name="float" /> float       |                                                                                                                                                 | float    | float      | float       |
| <a name="int32" /> int32       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32    | int        | int         |
| <a name="int64" /> int64       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64    | long       | int/long    |
| <a name="uint32" /> uint32     | Uses variable-length encoding.                                                                                                                  | uint32   | int        | int/long    |
| <a name="uint64" /> uint64     | Uses variable-length encoding.                                                                                                                  | uint64   | long       | int/long    |
| <a name="sint32" /> sint32     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.                            | int32    | int        | int         |
| <a name="sint64" /> sint64     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.                            | int64    | long       | int/long    |
| <a name="fixed32" /> fixed32   | Always four bytes. More efficient than uint32 if values are often greater than 2^28.                                                            | uint32   | int        | int         |
| <a name="fixed64" /> fixed64   | Always eight bytes. More efficient than uint64 if values are often greater than 2^56.                                                           | uint64   | long       | int/long    |
| <a name="sfixed32" /> sfixed32 | Always four bytes.                                                                                                                              | int32    | int        | int         |
| <a name="sfixed64" /> sfixed64 | Always eight bytes.                                                                                                                             | int64    | long       | int/long    |
| <a name="bool" /> bool         |                                                                                                                                                 | bool     | boolean    | boolean     |
| <a name="string" /> string     | A string must always contain UTF-8 encoded or 7-bit ASCII text.                                                                                 | string   | String     | str/unicode |
| <a name="bytes" /> bytes       | May contain any arbitrary sequence of bytes.                                                                                                    | string   | ByteString | str         |
