# System pools

System pools accumulate tokens for further re-distribution accordingly to conditions specified in system smart contracts. Every pool is the special account accessible only by system smart contracts, technically implemented as a field in `LedgerHeader` structure.


### lockedPool

Token: [XAT][1]

Filled with tokens by the network's startup procedure (details described in [Ace Token][1])

This pool is controlled by the Ace Token supply mechanism. Initially, all tokens in this pool are locked and cannot be used by any accounts until they are unlocked by burning Ace Tokens during the execution of the following smart contracts:

- [System Service Payment][10]
- [Non System Service Payment][11]
- [User Service Payment][12]
- [Add Broadcasting Rights Contract][13]

### unlockedPool

Token: [XAT][1]

Accumulates unlocked tokens from `lockedPool`

Re-distributed by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program


### inflationPool

Token: [XAT][1]

Replenishes by [Inflation][5]  system smart contract

Re-distributed by [Ace Deposit][6] system smart contract for sake of [Ace Deposit][7] program


### txFeePool

Token: [XAT][1]

Accumulates transaction processing fees, is not a subject of re-distribution for now, but will be periodically re-distributed between second layer validators in the future.


### trafficFeePool

Tokens: [XAC][8], [XAS][9]

Accumulates commissions from traffic fees. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.


### contentAccessFeePool

Tokens: [XAC][8], [XAS][9]

Accumulates commissions from content access fees. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.


### premiumFeePool

Token: [XAT][1], [XAC][8], Tokenы пулов

Accumulates commissions from premium pools. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.



[1]: ../system-tokens/ace-token.md
[3]: ../list-of-operations/ace-asset.md
[4]: ../services/ace-asset.md
[5]: ../list-of-operations/inflation.md
[6]: ../list-of-operations/ace-deposit.md
[7]: ../services/ace-deposit.md
[8]: ../system-tokens/ace-coin.md
[9]: ../system-tokens/ace-asset.md
[10]: ../list-of-operations/system-service-payment.md
[11]: ../list-of-operations/non-system-service-payment.md
[12]: ../list-of-operations/user-service-payment.md
[13]: ../list-of-operations/add-broadcasting-rights-contract.md
