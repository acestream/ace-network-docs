# Ace Assets

System smart contract that starts the procedure to  redistribute network income among specisal Ace Asset accounts. Might be initiated by any account, but network will only accept one operation each 24 hours.

## Pseudocode

```python

# list of pools that are distributed
pools = [trafficFeePool, premiumFeePool, contentAccessFeePool]

# find target accounts
targetAccounts = [ account in system.accounts if
    account.homedomain = 'ace-asset.acestream.network'
    and account.lastmodified <= now() - SystemSettings.ace_asset_min_lock_interval
    ]

# Distribute tokens from pools
totalAssetTokens = sum(account.assetTokens in targetAccounts)
for pool in pools:
    # The share of Ace Stream Foundation
    asfShare = pool.amount * SystemSettings.ace_asset_asf_share
    addTokens(ASF_PUBLIC_ACCOUNT, asfShare)

    # The rest is distributed among target accounts
    for account in targetAccounts:
        account.parent.tokens += (pool.amount - asfShare) * account.assetTokens / totalAssetTokens

# empty all pools
for pool in pools:
    pool.empty()
```


## Description

- Following system pools are subjects of redistribution:
    - [`trafficFeePool`][1]
    - [`contentAccessFeePool`][4]
    - [`premiumFeePool`][2]
- `ace_asset_adf_share` percent of the pools' content is transferred to an account managed by the Ace Stream Foundation
- the rest is distributed among the special Ace Asset accounts, which have not changed for at least `ace_asset_min_lock_interval` seconds
- distribution is performed in proportion to the number of AST in the special account
- tokens received as a result of distribution are credited to the special account holder's account
- the special account is not modified during the operation, so each such account will take part in the next distribution operation in 24 hours (if the account's owner does not modify it)
- after redistribution, all participating pools are reset to zero

[1]: ../glossary/system-pools.md#trafficfeepool
[2]: ../glossary/system-pools.md#premiumfeepool
[4]: ../glossary/system-pools.md#contentaccessfeepool
