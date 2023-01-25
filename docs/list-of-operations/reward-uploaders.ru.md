# Reward Uploaders

Запускает механизм ["лотерея"][1].

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 28 дней.


## Псевдокод

```python
# Find all premium pools where broadcasters pay for traffic
premiumPools = [ pool in system.premiumPools if
    pool.broadcasterPaysForTraffic == True
    ]

# Find all broadcasters with non-empty reward pool
broadcasters = [ broadcaster in premiumPools if
    broadcaster.uploadersRewardPool.amount > 0
    and len(broadcaster.uploaders) > 0
    ]

for broadcaster in broadcasters:
    # Make lots
    lots = []
    for uploader in broadcaster.uploaders:
        # trafficAmount contains amount of uploaded traffic in megabytes
        # Each uploaded gigabyte equals to one lot
        numberOfLots = floor(uploader.trafficAmount / 1024)
        for i in range(numberOfLots):
            lots.append(uploader.account)

    # Shuffle
    shuffle(lots)

    # win factor is stored in pool settings
    winFactor = broadcaster.pool.settings.uploaderRewardWinFactor

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
    singleReward = broadcaster.uploadersRewardPool.amount / len(winners)
    for winner in winners:
        addTokens(winner, singleReward)

    # reset uploaders
    broadcaster.uploaders.clear()

    # reset reward pool
    broadcaster.uploadersRewardPool.reset()
```


## Описание

- смарт-контракт находит все премиум пулы, в которых включена опция "оплата трафика бродкастером"
- среди всех бродкастеров, входящих в найденные премиум пулы, выбираются бродкастеры с непустым пулом вознаграждений (`uploadersRewardPool`). Если пул вознаграждений бродкастера не пустой, это означает, что по контенту данного бродкастера с момента предыдущего запуска смарт-контракта `Reward Uploaders` был сгенерирован и оплачен трафик
- для всех найденных бродкастеров выполняются такие действия:
    - генерируется массив лотов на основе списка кандидатов (`uploaders`) и коэффициента выигрыша (`winFactor`)
    - список кандитатов - это массив публичных ключей узлов, которые отдавали трафик данного бродкастера с момента предудыщего запуска смарт-контракта `Reward Uploaders`. Для каждого узла в списке хранится количество отданных единиц трафика
    - коэффициент выигрыша - это целое число, которое хранится в настройках премиум пула. Задает соотношение количества победителей к общему количеству лотов
    - каждый отданный гигабайт трафика (1024 Мб) приравнивается к одному лоту
    - в розыгрыше принимают участие только кандидаты, отдавшие >= 1 Гб трафика
    - количество лотов для одного кандидата не ограничено
    - определяется количество победителей на основе коэффициента выигрыша (при коэффициенте N победителем является каждый N-тый элемент массива лотов)
    - если количество лотов меньше коэффициента выигрыша, то выбирается один победитель
    - смарт-контракт случайным образом выбирает нужное количество победителей из массива лотов
    - содержимое пула вознаграждений равным образом распределяется между победившими лотами
    - после розыгрыша пул вознаграждений и список кандитатов обнуляются


## Пример

Пусть в сети есть один бродкастер, который оплачивает трафик, и аккаунт данного бродкастера на момент запуска смарт-контракта `Reward Uploaders` содержит такие данные:

- пул вознаграждений: 1.1 XAT
- список кандидатов, которые отдали >= 1 Гб трафика:
    - userA: отдал 60 Гб
    - userB: отдал 70 Гб
    - userC: отдал 2 Гб
    - userD: отдал 85 Гб

Пусть коэффициент выигрыша равен 100, тогда:

- общее количество лотов: `60 + 70 + 2 + 85 = 217`
- количество лотов-победителей: `floor(217 / 2) = 2`
- выигрыш на один лот: `1.1 / 2 = 0.55 XAT`

Смарт-контракт `Reward Uploaders` выбирает случайным образом 2 из 217 лотов и начисляет владельцам этих лотов по 0.55 XAT. Если оба выигрышных лота принадлежат одному владельцу, то он получает 1.1 XAT.


[1]: ../traffic-payments/broadcaster-payments.md
