# Distribute Subscriptions

Запускает механизм распределения дохода от подписок в премиум пуле.

Эта операция является системным смарт-контрактом.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 24 часа.


## Псевдокод

```python
# Find all unprocessed subscriptions
for subscription in findUnprocessedSubscriptions():
  # Get watch duration as a list of tuples (broadcaster, duration) where:
  # - broadcaster: broadcaster's account
  # - duration: total duration of watching broadcaster's content by
  #   subscription.owner during the specified period
  #
  # This data is retrieved from the layer 2
  watchDuration = getWatchDuration(
    subscription.pool,
    subscription.owner,
    subscription.createdAt,
    subscription.duration)

  # Get total duration
  totalDuration = 0
  for (broadcaster, duration) in watchDuration:
    totalDuration += duration

  # The amount of tokens to distribute among broadcasters is stored in
  # the "broadcastersShare" field of the subscription
  tokensToDistribute = subscription.totalToShare

  # Distribute tokens to broadcasters proportionally to the watch duration
  for (broadcaster, duration) in watchDuration:
    addTokens(broadcaster, tokensToDistribute * duration / totalDuration)

  # Mark period as processed
  markAsProcessed(subscription.id, subscription.currentPeriod)

```


## Описание

- найти все необработанные подписки премиум пула (это подписки, с момента активации которых прошло более 28 дней, либо срок действия которых закончился, но доход за соответствующий период еще не был распределен между участниками)
- с каждой найденной подпиской провести такие операции:
    - получить из второго уровня информацию о времени просмотра за необработанный период (каких участников премиум пула смотрел владелец подписки и сколько времени)
    - распределить такое количество токенов между участниками (пропорционально времени просмотра):

      `toShare` = `totalToShare` * `periodDuration` / `totalDuration`

      где

        - `toShare` - сколько токенов распределить
        - `totalToShare` - общее количество токенов, которые должны быть распределены в рамках данной подписки
        - `periodDuration` - длительность периода, за который выполняется начисление
        - `totalDuration` - длительность подписки

    - отменить период как обработанный
