# Basic settings

System settings that define system's econo,y and system smart contracts' behaviour, like traffic fees, lists of oracles used to validate [content proprietors][1], etc.

Basic settings are stored in the main blockchain (in `ledgerHeader`).

Change of basic settings can only be performed by the network's governance procedures, for example, by voting of [Ace Assets (XAS)][6] owners.


## Список настроек

### traffic_user_payment_fee

Network's commission taken from traffic fees
Current value: 10%

### traffic_broadcaster_payment_fee
Network's commission taken from broadcaster's charges made in premium pool
Current value: 30%

### ace_asset_asf_share
Ace Stream Foundation's stake in [Ace Asset][2] token distribution.
Current value: 30%

### premium_pool_create_fee
One-time payment charged to create[the premium pool][5]
Current value: 1000 XAT

### premium_pool_emission_fee
Network's stake in tokens minted by [the premium pool][5]
Current value: 30%.

### premium_pool_access_fee
Network's stake in content access payments in [the premium pool][5]
Current value: 30%

### system_premium_pool_settings
System premium pool settings, TBD in separate document

### ace_asset_min_lock_interval
Minimal depositing term for [XAS][6] to participate in [Ace Asset][2].
Current value: 1209600 seconds (14 days)

### ace_deposit_min_lock_interval
Minimal depositing term for XAT to participate in [Ace Deposit][4].
Current value: 2419200 seconds (28 days)

### traffic_credit_limit
Maximum amount of traffic units that could be borrowed by the account
Current value: 10240 (10 GByte)

### copyright_holder_oracles
List of oracles that have rights to identify copyright holders

### add_device_fee
One-time fee to link new node to the account
Current value: 0.1 XAT


## Voting

Voting is the self-governance procedure that specifies how [Ace Assets (XAS)][6] holders can change the network. For now voting is expected to get done by third party voting system, decisions made by XAS owners should be implemented by validators as part of [system upgrade][3] process. In future integral voting subsystem should be integrated in Ace Network directly.



[1]: ../network-participants/copyright-holders.md
[2]: ../services/ace-asset.md
[3]: https://developers.stellar.org/docs/run-core-node/network-upgrades/
[4]: ../services/ace-deposit.md
[5]: ../services/premium-pool.md
[6]: ../system-tokens/ace-asset.md
