# Ace Asset

Запускает механизм распределения доходов сети между специальным счетами Ace Asset.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 24 часа.


## Псевдокод

```

# list of pools which are affected
pools = [trafficFeePool, premiumFeePool, unlockedPool]

# find target accounts
targetAccounts = { get accounts where
   account.homedomain = 'ace-asset.acestream.network'
   and account.lastmodified <= now() - networkSettings.ace_asset_min_lock_interval
}

# Distribute tokens from pools
totalAssetTokens = sum(account.assetTokens in targetAccounts)
for (pool in pools) {
  # The share of ASF
  asfShare = pool.amount * networkSettings.ace_asset_asf_share
  addTokens(ASF_PUBLIC_ACCOUNT, asfShare)

  # The rest is distributed among target accounts
  for (account in targetAccounts) {
    account.parent.tokens += (pool.amount - asfShare) * account.assetTokens / totalAssetTokens
  }
}

# empty all pools
for (pool in pools) {
  pool.empty()
}
```


## Описание

- распределяются такие системные пулы:
    - [`trafficFeePool`][1]
    - [`premiumFeePool`][2]
    - [`unlockedPool`][3]
- `ace_asset_adf_share` процентов содержимого пулов перечисляется на аккаунт под управлением Ace Stream Foundation
- остальное содержимое пулов распределяется между специальными счетами Ace Asset, которые не изменялись как минимум `ace_asset_min_lock_interval` секунд (это системная настройка)
- распределение выполняется пропорционально количеству XAS на специальном счету
- токены, полученные в результате распределения, начисляются на счет владельца специального счета
- в ходе операции специальный счет не модифицируется, поэтому каждый такой счет будет принимать участие в следующей операции распределения через 24 часа (если владелец счета не модифицирует его)
- после распределения все участвующие пулы обнуляются

[1]: ../glossary/system-pools.md#trafficfeepool
[2]: ../glossary/system-pools.md#premiumfeepool
[3]: ../glossary/system-pools.md#unlockedpool