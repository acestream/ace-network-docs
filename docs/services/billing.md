# Billing

This section describes payment options for access to content in the Ace Stream network.


## Per minute billing

Provides payment for each minute of content viewing. Funds are debited from the user's account when viewing the content of the broadcaster. Payment is made in AceByte tokens or stablecoins.

Per-minute billing can be used by:

- Single broadcasters (not connected to pools)
- Personalized pools (without the need to issue their own tokens)

Any broadcaster can specify the cost of per-minute access when publishing content. This information is written to the transport file and is used when accessing this content outside of pools.

When accessing broadcaster content within a pool, the pool's billing settings are used. For example, if a broadcaster is connected to a personalized pool with per-minute billing, then the payment for a minute of access is made at the price fixed in the pool settings. The price in the pool can be changed by its owners.


## One-time access

Provides access to one specific piece of content. The logic of how one-time access works depends on the type of content:

- AVOD (audio or video on demand) - access is granted forever
- Live - access is provided for a fixed time (this time is specified in the billing settings)

One-time access can be used:

- Single broadcasters (not connected to pools)
- Personalized pools (without the need to issue their own tokens)

Single broadcasters set the price of a single access when publishing (in the transport file).

Personalized pools set the price of one-time access in the settings.

Payment is made in AceByte tokens or stablecoins.


## Subscription

A subscription provides access to all content within the pool for a fixed period of time (for example, 28 days). Subscription access is limited to content playback time - no more than 1000 hours per month.

The subscription is used in:

- System premium pool
- Personalized pools with their own tokens

The system pool uses two subscription options:

- For 28 days
- For 365 days

The price for these subscriptions is stored in the system settings, expressed in AceByte tokens, and can be changed by Ace Stream DAO voting.

The price and duration of subscriptions in personalized pools is regulated by their owners.
