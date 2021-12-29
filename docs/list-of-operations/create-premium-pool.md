# Create Premium Pool

The operation creates the premium pool and withdraws one-time fee of 1000 XAT from the initiator's account (tokens are transferred to [`premiumFeePool`][1])

When pool is bein created with its own tokens, the network charges comission of 30% of issuance (tokens are transferred to [`premiumFeePool`][1])

Threshold: medium

## Parameters

- `destination` - the public key of the pool to be created
- `pool settings` - pool's settings
- `use system tokens` - whether the pool will use system tokens to pay for access to content
- `traffic payer` - who pays for the traffic (watchers or broadcasters)
- `number of tokens` - amount of own tokens issuance (for pools with their own tokens)
- `asset name` - token's ticker (for pools with their own tokens)


[1]: ../glossary/system-pools.md#premiumfeepool
