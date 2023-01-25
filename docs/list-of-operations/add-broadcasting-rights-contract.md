# Add Broadcasting Rights Contract

Register the contract for broadcasting rights.

This operation can be executed only be the oracle (account with type `BROADCASTING_RIGHTS_ORACLE`)

Threshold: medium

## Parameters

- `description` - description of the contract
- `dateStart` - timestamp of the contract start
- `dateEnd` - timestamp of the contract end
- `duration` - total duration of the broadcasting according to the contract (in seconds)
- `value` - total value of the contract in XAB

This operation registers the contract from the real (offchain) world in the blockchain
and unlocks `value` XAB if there are any locked tokens.