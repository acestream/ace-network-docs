# Premium Pool

A premium pool is one or more broadcasters who share a common billing policy. Technically, a premium pool is a blockchain-stored entity that has the following properties:

- list of owners
- list of broadcasters
- billing policy
- income redistribution policy

All properties can be changed only through the procedure of voting of pool's owners.


## Copyrights

Premium pools may be automatically dismantled if owners fail to provide evidence of copyright ownership. Ace Network has oracles entitled to resolve copyright disputes, and the majority of oracles can decide to stop premium pools because of copyright violations.


## Pool-specific Tokens

Pools are able to issue their own tokens. In that case, where owners had chosen to have their own token, the full amount of such tokens should be minted as part of the pool's creation procedure.

The pool may operate minted tokens as with local currency, for example — demand payment for the pool's content in the pool's tokens.


## Authomated exchange of pool specific-tokens

If a user wishes to pay for the pool's content with system tokens, the pool-specific tokens could be automatically bought on the system's internal [exchange][11].



## Pool creation

Any Ace Network's account is able to create pools by performing [Create Premium Pool][1] operation, that includes:

- confirming pool's properties
- deciding who should be billed for pool's traffic (either broadcasters or watchers)
- deciding if the pool would need its own token or not
- paying system fee of 1000XAB to create a pool with specified parameters

As a result, a special account to represent the newly created pool and store its parameters will be created. Owners of the pool will be signors of this special account.


## Broadcasting from the pools

If brodcaster is listed in pool's settings and want to start publishing content they have to specify pool's public key in transport file.

New broadcaster can be assigned to the pool by its owners or accounts to which the owners had delegated such rights.



## System pool

System pool is an open pool owned by the whole Ace Network.

The system pool settings are stored in the `system_premium_pool_settings` system setting, which could be altered by [changing the system settings][4] procedure.

Unlike regular premium pools, the billing settings of the system pool can be changed.

Any broadcaster is able to join the system pool.

System tokens are used to pay for content assigned to the system pool.


## Pool owners and pool participants

Pool owners are accounts that are authorized to change pool settings, list of owners, and list of participants. Pool owners initially own all tokens that were issued (if the pool had issued its own tokens when the pool was created).

Pool participants are the broadcasters assigned to the pool. The list of participants is stored in the pool settings. Only the pool owners can change the list of participants. The only exception is the system pool - any broadcaster can become its member.


## Network's commissions

In pools that issued their tokens, the network's commission applies only to token issuance - 30% of its total amount.
There is no commission taken for access to content in such pools.

In pools without their own tokens, the network commission is 30% of each payment for content access.



## Pool settings

Apart of other parameters, pool's settings specify:

- list of participants (brokers)
- income redistribution policy
- billing policies:
    - who pays for the traffic (broadcasters or users)
    - one-time access fee
    - per minute cost for the per minute billing
    - cost and duration of the subscription plan

The billing settings allow pool owners to enable or disable certain types of billing, as well as to create multiple access options. For example, owner can disable one-time access and per-minute charging, and offer two subscription options: for 30 and 360 days.

The cost of access can depend on the user's country, which can also be specified in the billing settings.

Billing policies are specified when creating a pool and cannot be changed later. If there is a need to change the terms of access to content, brand new pool should be created to provide new terms.

The billing policies apply to all content assigned to the pool.




## Pool income distribution

The premium pool receives income in the form of payments for access to content. This income is distributed among the broadcasters of this pool according to the billing rules described below.

Also, in the pool settings, you can optionally specify the accounts that will receive deductions from all payments for access to content within the pool.

Example:

```json
{
  "shareholders": [
    {
      "account_id": "GCXVRWMPOXVHW34Q4DUCFYGEKCOHCJ6SKBMHC63SRTNM3QMDZUZQOSL4",
      "share": 0.1
    },
    {
      "account_id": "GACJFCLDILCE5KT3UZ5KX2NRPHFNCUTYZYRIZRRAEAC5O3GYZKIISSNO",
      "share": 0.05
    }
  ]
}
```

In this example account `GCXV...OSL4` will receive 10% of income and account`GACJ...SSNO` - 5%.
The rest 85% will be distributed among the broadcasters.


## Billing

### Subscription

Subscription provides access to the content within pool for specified period of time (for example 30 days. Subscription access is restricted by viewing time and is no more than 1000 minutes per month. 

Purchase of a subscription is carried out by operation [Buy Subscription][5].

Subscription is activated at a time of purchasing.

Distribution of funds from payments is done in 2 phases.
The network commission (for pools without their own tokens) and the share of accounts that receive deductions according to the pool settings (if any) are distributed at the time of purchasing a subscription.
The share of broadcasters is distributed by smart-contract[Distribute Subscriptions][6] after the subscription expires. The share of broadcasters is distributed among the broadcasters whose content was watched by the user of the subscription during the period of its validity and in proportion to the viewing time. For details of the distribution algorithm see the description of the smart contract.


### Per minute tariff

It provides payment for each minute of content viewing. Funds are debited from the account to pay for the services of the user who watches the content. Funds are distributed at the time of payment. The Broadcaster's share is credited to his account at the time of payment.

The write-off and distribution of funds is carried out by the second-level blockchain within the system of [traffic and time accounting][7].


### One-time access

Provides access to one specific unit of content.

The logic of work of one-time access depends on the type of content:

- VOD - access is provided forever
- Live - access is provided for a fixed time (this time is indicated in the billing settings)

Purchase of one-time access is carried out by operation [Buy Single Access][8]. This operation carries out distribution of funds. Funds are debited from the account to pay for the services of the user who watches the content. Funds are distributed at the time of payment. The Broadcaster's share is credited to his account at the time of payment.

One-time access is activated at the time of purchase.


## Traffic payment

In the settings of pool there is a possibility to chose the side who pays for traffic and it is user or broadcaster.

If traffic is paid by users, then calculations for traffic are done in a common scheme (the same as for content which is on contained in the premium pool). 

Payment for traffic by broadcasters is done as follows:

- all traffic is paid from a special broadcaster account
- peers consuming traffic pay nothing
- peers providing traffic can receive a reward through the "lottery" system (detailed description [here][9])


## Content access control

Access control is fully decentralized and is carried out by network nodes. Each node that participates in the premium pool's data transmission checks whether its remote peer has been authorized to access this content accordingly to the pool settings.



[1]: ../list-of-operations/create-premium-pool.md
[2]: #_3
[3]: ../glossary/transport-file.md
[4]: ../glossary/system-settings.md
[5]: ../list-of-operations/buy-subscription.md
[6]: ../list-of-operations/distribute-subscriptions.md
[7]: ../get-started/traffic-time-accounting.md
[8]: ../list-of-operations/buy-single-access.md
[9]: ../traffic-payments/broadcaster-payments.md
[10]: #_7
[11]: ../system-tokens/exchange.md
