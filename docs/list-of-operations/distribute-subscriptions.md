# Distribute Subscriptions

==TODO: rewrite==

Запускает механизм распределения платежей за статус "премиум".

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 24 часа.


## Псевдокод

```bash
# find all accounts with "premium" status
premiumAccounts = { get accounts where
  account.homedomain.startsWith('premium.acestream.network')
  and account.isLocked()
}

# find accounts with finished "premium" status
targets = for (account in premiumAccounts) {
  # extract owner account and days from homedomain
  owner, days = parseDetails(account.homedomain)
  if (now() - account.lastmodified >= days*86400) {
    yield { account, owner, days }
  }
}

for (target in targets) {
  # Get watch duration as a list of tuples (broadcaster, duration) where:
  # - broadcaster: broadcaster's account
  # - duration: total duration of watching broadcaster's content by target.owner during the specified period
  # This data is retrieved from the layer 2
  watchDuration = getWatchDuration(target.owner, target.account.lastmodified, target.days)

  # get total duration
  totalDuration = 0
  for ((broadcaster, duration) in watchDuration) {
    totalDuration += duration
  }


  # System fee
  fee = target.account.tokens * NetworkSettings.premium_fee
  premiumPool.amount += fee
  # The rest of tokens is distributed among broadcasters
  totalBroadcasterTokens = target.account.tokens - fee

  # distribute tokens to broadcasters proportionally to the watch duration
  for ((broadcaster, duration) in watchDuration) {
    addTokens(broadcaster, totalBroadcasterTokens * duration / totalDuration)
  }

  deleteAccount(target.account)
}
```


## Описание

- найти все маркеры статуса "премиум" (заблокированные аккаунты с отметкой `premium.acestream.network`)
- выбрать из них те, срок действия которых закончился
- с каждый найденным аккаунтом-маркером провести такие операции:
    - получить из второго уровня информацию о времени просмотра за период действия статуса "премиум" (каких бродкастеров смотрел владелец статуса "премиум" и сколько времени)
    - 30% токенов на аккаунте-маркере перевести в системный пул `premiumPool`
    - 70% токенов на аккаунте-маркере распределить между бродкастерами пропорционально времени просмотра
    - удалить аккаунт-маркер