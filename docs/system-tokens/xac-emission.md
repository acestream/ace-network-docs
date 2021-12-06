# Ace Coin issuance


Ace Coin is issued automatically by [system smart contracts][1] as the part of
payment process (when paid for services related to content generation).

Such services can be paid for by any of three system tokens: [XAT][6], [XAC][5], [XAS][7]. First of all, [XAC][5] tokens are used, but if XAC amount are not enough, then smart contract will charge
[XAT][6] or [XAS][7] accounts as described below in this section). Issuance of [XAC][5] is the part of this algorithm.


## Services

- payment for traffic
- payments for accessing content (e.g., in the [premium pool][2])
- rewards paid to members by the Network:
    - for watching ads
    - for re-distribution of DAO Ace Stream applications (for device manufacturers, OEMs)
    - for moderation of content in the Network


## Payment algorithm

- if the account has enough [XAC][5] to pay, only [XAC][5] is used
- if there is not enough [XAC][5] on the account, then the difference is being paid by [XAT][6]:
    - the required amount of [XAT][6] is calculated with using [token exchange module][3]
    - this amount of [XAT][6] debits from the payer and transfers to the non-refundable account (burnt)
    - the same amount of [XAT][6] withdraws from [`lockedPool`][4] (if that pool is not empty)
    - the recipient of the payment receives [XAC][5] tokens, recently exchanged
- if there is not enough [XAT][6] on the account, the difference is being paid by [XAS][7]
    - the token exchange module calculates the necessary amount of [XAS][7]
    - this amount of [XAS][7] debits from the payer's account and credited to the recipient's

## An example

Suppose that a user buys one-time access to content in the system's premium pool.
Let's take these inputs as an example:

- cost of access: 3 XAC
- user has 1 XAC and 7 XAT
- exchange rate on the system's DEX is 1 XAC for 2 XAT

The user does not have enough Ace Coins (XAC) to pay, so part of the cost will be paid in Ace Tokens (XAT).
The user is short 2 XAC. Accordingly to the current exchange rate, the equivalent of this amount is 4 XAT.
At the time of the payment, the following operations will be performed:

- 1 XAC and 4 XAT are being charged from user's wallet
- 4 XATs received from the user are being burned
- 4 XAT are getting back into circulation by transferring from `lockedPool` to `unlockedPool`
- 0.9 XAC credits to the system pool `premiumFeePool` (this is the system commission)
- the receiver of this payment (brodcaster) gets 2.1 XAC (3 XAC minus the system commission)


[1]: ../glossary/system-smart-contracts.md
[2]: ../services/premium-pool.md
[3]: exchange.md
[4]: ../glossary/system-pools.md#lockedpool
[5]: ../system-tokens/ace-coin.md
[6]: ../system-tokens/ace-token.md
[7]: ../system-tokens/ace-asset.md
