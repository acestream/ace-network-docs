# Distribute Subscriptions

Запускает механизм распределения дохода от подписок в премиум пуле.

Эта операция является системным смарт-контрактом.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 24 часа.


## Псевдокод

```python

# Find all unprocessed subscriptions
subscriptions = [ account.getUnprocessedSubscriptions() in system.accounts if
  account.hasUnprocessedSubscriptions()
]

for subscription in subscriptions:
  # Get watch duration as a list of tuples (broadcaster, duration) where:
  # - broadcaster: broadcaster's account
  # - duration: total duration of watching broadcaster's content by target.owner during the specified period
  # This data is retrieved from the layer 2
  watchDuration = getWatchDuration(subscription.owner, subscription.createdAt, subscription.duration)

  # Get total duration
  totalDuration = 0
  for (broadcaster, duration) in watchDuration:
    totalDuration += duration

  # The amount of tokens to distribute among broadcasters is stored in
  # the "broadcastersShare" field of the subscription
  tokensToDistribute = subscription.broadcastersShare

  # Distribute tokens to broadcasters proportionally to the watch duration
  for (broadcaster, duration) in watchDuration:
    addTokens(broadcaster, tokensToDistribute * duration / totalDuration)

  # Remove processed subscription from the ledger
  removeSubscription(subscription.owner, subscription.id)

```


## Описание

- найти все необработанные подписки (это подписки, срок действия которых закончился, но доход от них еще не был распределен между бродкастерами)
- с каждой найденной подпиской провести такие операции:
    - получить из второго уровня информацию о времени просмотра за период действия подписки (каких бродкастеров смотрел владелец подписки и сколько времени)
    - токены в поле `broadcastersShare` подписки распределить между бродкастерами пропорционально времени просмотра
    - удалить обработанную подписку