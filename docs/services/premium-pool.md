# Premium Pool

The "Premium Pool" service allows any broadcasters (content providers and OTT services) to form pools with a single common subscription or with the same conditions for accessing their services, eliminating the need for users to register and buy subscription services on each individual OTT service.

There are two types of premium pools, each of which is explained in details later in this section:

- System pool
- Personalized pool

The premium pool earns income in the form of payments for access to content. This income is formed and distributed among the broadcasters of this pool according to the [billing rules][5] established by the organizers of the pool

In the event that oracles detect content, the rights to which belong to other Network members who are participants in the LTS program, the distribution of income is carried out on the terms of the LTS program


## System pool

The system pool exists on the network since launch, in a single instance. The organizer and owner of the system pool is the entire Network - this means that changing the pool settings (billing settings) is possible only by Ace Stream DAO voting.

The system pool is open - any broadcaster can join it. To connect, the broadcaster must indicate whether they are ready to pay for traffic.


### Billing

The system pool works on the terms of "Subscription"

A subscription provides access to content within the system pool for a fixed period of time: for 28 or 365 days. Subscription access is limited by content playback time - no more than 1000 hours per month. The cost of access will depend on the country/region of the subscriber, as well as whether traffic is included in the subscription price. If the user chooses a subscription with included traffic, then all traffic within this subscription is paid by the broadcaster.

The purchase of a subscription is carried out by a smart contract [Buy Subscription][1]. Ace Byte tokens are used for payment.

The subscription is activated at the time of purchase.


### Income distribution

Funds received from payment of subscriptions are distributed in the following ratio:

- Network fee - 30%
- Broadcasters - 70%

The network fee is charged at the time of purchase of the subscription. The amount paid by the user for the subscription, minus the network fee, is proportionally distributed by the [Distribute Subscriptions][2] system smart contract between participants (broadcasters), based on the percentage of the total time spent by the subscriber on watching the content of one or another pool participant (for which is being calculated), in relation to the total time spent by them to watch content from other members of the pool. See the details of the distribution algorithm in the description of the smart contract. Payments to broadcasters are made monthly: in full if the subscription was for 28 days or with a breakdown of payment monthly (for the relevant time periods) if the subscription was paid for 365 days.


## Personalized pool

A personalized pool can be created by any network account. The procedure for creating such a pool depends on the choice of billing settings (parameters).

A personalized pool is an association of one or more broadcasters, which is characterized by common billing conditions. From a technical point of view, a "personalized pool" is an entity in the blockchain with the following properties:

- Pool name (community thematic name)
- List of organizers of the pool (accounts of the organizers)
- List of pool members (accounts of broadcasters and their playlists)
- Billing settings (determining the conditions for accessing content)

Organizers and participants of the pool:

- Pool organizers are accounts that have the right to change pool settings, including the list of pool members
- Pool members are accounts connected to the pool and providing their playlists to the pool. The list of participants is stored in the pool settings. Only the owners of the pool can change the list of members.


### Billing settings

Billing settings allow you to enable or disable certain types of billing, as well as create multiple access options. For example, you can connect one-time access and per-minute billing, as well as make two subscription options: for 28 and for 365 days.

The cost of access may depend on the country, which can also be specified in the billing settings.

Billing settings are specified when the pool is created and cannot be changed afterwards. If it becomes necessary to change the conditions for accessing content, you need to create a new premium pool with new settings.

Billing settings apply to all content connected to the pool.


#### Subscription

To create a "personalized pool" on a "subscription" basis, it is necessary to issue content provider tokens in the Ace Maker protocol, with the appropriate parameters.
<!-- The mechanics of creating a pool is described in detail here (link to Ace Maker) -->

Scheme of work of a personalized pool, on a subscription basis:

- Unique tokens (NFTs) are tied to the pool, which are created by the pool members
- Each token gives a general right to access the content of all members of the pool
- Emission of tokens is carried out at the time of their purchase by users
- Funds from purchases are distributed by the system smart contract [Distribute Subscriptions][2] (similar to the description in the "system pool", but without paying the network fee)

Pool members initially own all the tokens that are issued during the creation of such a pool.

The price of tokens of a personalized pool is determined and regulated by the organizers of such a pool, and any methods offered by issuers of this type of tokens are used to pay (purchase) them.

A subscription provides access to the content within the pool for a fixed period of time (for example, 28 days). Subscription access is limited to watching time - no more than 1000 hours per month.

The purchase and activation of a subscription is carried out by means of a token (NFT) created by the pool, through any network portal convenient for the user.


#### Per-minute billing and one-time access

Organizers can create "personalized pools" on a per-minute billing basis or on a one-time basis, without using the Ace Maker protocol and without issuing their tokens, provided that all broadcasters (pool members) provide access to their content under the same conditions.

In addition to the type of access (per-minute billing or one-time access), in the billing settings, you must specify who pays for the traffic - the user or the broadcaster. For one-time access, it is possible to specify both options by assigning them a different price (i.e. give the user a choice of two access options - with and without traffic included).

Ace Bytes (XAB) tokens are used for payment, as well as Ace Coins (stablecoins of the Ace Maker protocol)

To create a "personalized pool" on the terms of "Per-minute billing" and/or "One-time access", without using the Ace Maker protocol and without issuing your own tokens, you need to pay the Network a one-time fee of 10 XAB. In addition to the one-time fee, the Network charges a fee of 30% from each content access payment.


##### Per-minute billing

Provides payment for each minute of watching content. Funds are debited from the user's account when watching the content of the broadcaster. Payment to the broadcaster is credited to his account after 28 days, minus the Network fee.

The debiting of funds from the user and their accrual to the broadcaster is carried out by the second-level blockchain (L2) within the framework of the [traffic and time accounting system][3].


##### One-time access

Provides access to one specific piece of content. One-time access is activated at the time of purchase.

The logic of how one-time access works depends on the type of content:

- AVOD (audio or video on demand) - access is granted forever
- Live - access is provided for a fixed time (this time is specified in the billing settings)

One-time access is purchased using the [Buy Single Access][4] operation. The same operation performs the allocation of funds. Funds are debited from the account of the user who watches the content and are paid to the broadcaster, minus the Network fee. Payment to the broadcaster is credited to his account after 28 days.


#### Pool settings

The following information is stored in the pool settings:

- list of participants (broadcasters)
- income distribution settings

In the income distribution settings, you can optionally specify accounts that will receive deductions from all payments for access to content within the pool (if the pool provides for the payment of remuneration not only to broadcasters, but also to other members of the Network).


## Traffic payment

Traffic is paid by users, broadcasters or content providers, depending on the usage scheme:

- in a personalized pool with content provider tokens traffic is always paid by the content provider
- in the system pool and in the personalized pool without content provider tokens, the party paying for traffic depends on the billing settings (for example, if a user purchases a subscription with included traffic in the system pool, then the broadcaster will pay for the traffic)

If traffic is paid by users, then calculations for traffic are done in a common scheme (the same as for content which is not contained in the premium pool).

Payment for traffic by broadcasters or content providers is done as follows:

- all traffic is paid from a special account of a broadcaster or content provider
- users consuming traffic pay nothing
- users providing traffic can receive a reward through the "lottery" system (detailed description [here][6])


## Content access control

Access control is fully decentralized and is carried out by network nodes. Each node that participates in the premium pool's data transmission checks whether its remote peer has been authorized to access this content accordingly to the pool settings.



[1]: ../list-of-operations/buy-subscription.md
[2]: ../list-of-operations/distribute-subscriptions.md
[3]: ../get-started/traffic-time-accounting.md
[4]: ../list-of-operations/buy-single-access.md
[5]: ../services/billing.md
[6]: ../traffic-payments/lottery-system.md
