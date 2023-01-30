# Reward Uploaders

Запускает механизм ["лотерея"][1].

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 28 дней.


## Псевдокод

```python
# Iterate over all non-empty reward pools
for rewardPool in nonEmptyRewardPools:
    # Make lots
    lots = []
    for uploader in rewardPool.uploaders:
        # trafficAmount contains amount of uploaded traffic in megabytes
        # Each uploaded gigabyte equals to one lot
        numberOfLots = floor(uploader.trafficAmount / 1024)
        for i in range(numberOfLots):
            lots.append(uploader.account)

    # Shuffle
    shuffle(lots)

    # win factor is stored in pool settings
    winFactor = SystemSettings.uploaderRewardWinFactor

    # Number of winner is based on the win factor.
    # For example, if win factor if 100, then each 100th lot is a winner.
    numberOfWinners = floor(len(lots) / winFactor)

    # If number of lots is less than win factor then one winner gets all reward
    if numberOfWinners == 0:
        numberOfWinners = 1

    # Select winners
    winners = []
    for i in range(numberOfWinners):
        winners.append(lots[i*winFactor])

    # Reward pool is distributed equally among the winners
    singleReward = rewardPool.amount / len(winners)
    for winner in winners:
        addTokens(winner, singleReward)

    # reset reward pool (empty amount and uploaders)
    rewardPool.reset()
```


## Описание

- смарт-контракт находит все непустые пулы вознаграждений
- для каждого найденного пула выполняются такие действия:
    - генерируется массив лотов на основе списка кандидатов (`uploaders`) и коэффициента выигрыша (`winFactor`)
    - список кандитатов - это массив публичных ключей узлов, которые отдавали трафик данного бродкастера либо пула с момента предудыщего запуска смарт-контракта `Reward Uploaders`. Для каждого узла в списке хранится количество отданных единиц трафика
    - коэффициент выигрыша - это целое число, которое хранится в системных настройках. Задает соотношение количества победителей к общему количеству лотов
    - каждый отданный гигабайт трафика (1024 Мб) приравнивается к одному лоту
    - в розыгрыше принимают участие только кандидаты, отдавшие >= 1 Гб трафика
    - количество лотов для одного кандидата ограничено формулой:

        `maxLots = accessPrice / trafficPrice`
        где:

        - `accessPrice` - стоимость доступа к контенту, в стейблкоинах
        - `trafficPrice` - стоимость 1 Гб трафика в стейблкоинах (вычисляется на основе текущей рыночной цены токена AceByte)

    - определяется количество победителей на основе коэффициента выигрыша (при коэффициенте N победителем является каждый N-тый элемент массива лотов)
    - если количество лотов меньше коэффициента выигрыша, то выбирается один победитель
    - смарт-контракт случайным образом выбирает нужное количество победителей из массива лотов
    - содержимое пула вознаграждений равным образом распределяется между победившими лотами
    - после розыгрыша пул вознаграждений и список кандитатов обнуляются


## Пример

Пусть в сети есть один пул вознаграждения, который на момент запуска смарт-контракта `Reward Uploaders` содержит такие данные:

- пул вознаграждений: 3 XAB
- список кандидатов, которые отдали >= 1 Гб трафика:
    - userA: отдал 60 Гб
    - userB: отдал 70 Гб
    - userC: отдал 2 Гб
    - userD: отдал 85 Гб

Пусть коэффициент выигрыша равен 100, тогда:

- общее количество лотов: `60 + 70 + 2 + 85 = 217`
- количество лотов-победителей: `floor(217 / 2) = 2`
- выигрыш на один лот: `3 / 2 = 1.5 XAB`

Смарт-контракт `Reward Uploaders` выбирает случайным образом 2 из 217 лотов и начисляет владельцам этих лотов по 1.5 XAB. Если оба выигрышных лота принадлежат одному владельцу, то он получает 3 XAB.


[1]: ../traffic-payments/lottery-system.md