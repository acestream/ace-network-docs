# System pools

System pools accumulate tokens for further re-distribution accordingly to conditions specified in system smart contracts. Every pool is the special account accessible only by system smart contracts, technically implemented as a field in `LedgerHeader` structure.


### astLockedPool

Token: [AST][9]

Filled with tokens by AST issuing procedure (details described in [Ace Stream Token][9])

Initially, all tokens in this pool are locked and cannot be used by any accounts until they are unlocked by smart contract [Unlock System Tokens][14]


### txFeePool

Token: [XAB][1]

Accumulates transaction processing fees, is not a subject of re-distribution for now, but will be periodically re-distributed between second layer validators in the future.


### trafficFeePool

Tokens: [XAT][8], [AST][9]

Accumulates commissions from traffic fees. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.


### contentAccessFeePool

Tokens: [XAT][8], [AST][9]

Accumulates commissions from content access fees. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.


### premiumFeePool

Token: [XAB][1], [XAT][8], Tokenы пулов

Accumulates commissions from premium pools. Re-distributes by [Ace Asset][3] system smart contract for sake of [Ace Asset][4] program.



[1]: ../system-tokens/ace-byte.md
[3]: ../list-of-operations/ace-asset.md
[4]: ../services/ace-asset.md
[8]: ../system-tokens/ace-time.md
[9]: ../system-tokens/ace-stream-token.md
[14]: ../list-of-operations/unlock-system-tokens.md
