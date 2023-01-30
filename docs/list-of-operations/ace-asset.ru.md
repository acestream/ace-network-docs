# Ace Assets

Запускает механизм распределения доходов сети между специальным счетами Ace Asset.

Эта операция является системным смарт-контрактом.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 24 часа.


## Псевдокод

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


## Описание

- распределяются такие системные пулы:
    - [`trafficFeePool`][1]
    - [`contentAccessFeePool`][4]
    - [`premiumFeePool`][2]
- `ace_asset_adf_share` процентов содержимого пулов перечисляется на аккаунт под управлением Ace Stream Foundation
- остальное содержимое пулов распределяется между специальными счетами Ace Asset, которые не изменялись как минимум `ace_asset_min_lock_interval` секунд
- распределение выполняется пропорционально количеству XAS на специальном счету
- токены, полученные в результате распределения, начисляются на счет владельца специального счета
- в ходе операции специальный счет не модифицируется, поэтому каждый такой счет будет принимать участие в следующей операции распределения через 24 часа (если владелец счета не модифицирует его)
- после распределения все участвующие пулы обнуляются

[1]: ../glossary/system-pools.md#trafficfeepool
[2]: ../glossary/system-pools.md#premiumfeepool
[4]: ../glossary/system-pools.md#contentaccessfeepool
