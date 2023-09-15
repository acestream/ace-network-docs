# Система "Лотерея"

Система "лотерея" используется в случаях, когда трафик оплачивается не пользователями, а контент-провайдерами либо бродкастерами. Это возможно в таких случаях:

- просмотр контента в персонифицированном премиум пуле с использованием токенов контент провайдера
- просмотр платного контента во всех других случаях при условии, что бродкастер указал в настройках биллинга, что он будет оплачивать трафик

В такой схеме узлы, отдающие трафик, получают вознаграждение не напрямую (как при обычных расчетах за трафик), а по системе "лотерея", описанной в этом разделе. Такая архитектура минимизирует риски накрутки со стороны отдающих узлов.

## Алгоритм

Система "Лотерея" выполняет розыгрыш вознаграждения между пользователями, которые активно отдавали трафик:

- в розыгрыше принимают участие пользователи, которые отдали как минимум 1 Гб трафика
- за каждый 1 Гб отданного трафика участник получает 1 лот
- раз в 28 дней запускается лотерея - это смарт-контракт [Reward Uploaders][1], который выбирает случайным образом выигрышные лоты и перечисляет им вознаграждение
- максимальное количество лотов на одного пользователя рассчитывается по формуле:

    `maxLots = accessPrice / trafficPrice`

    где:

    - `accessPrice` - стоимость доступа к контенту, в стейблкоинах
    - `trafficPrice` - стоимость 1 Гб трафика в стейблкоинах (текущая - 0,01$ за 1 ГБ)

- коэффициент выигрыша составляет 1:100:
    - выигрышным является каждый сотый лот
    - выигрышный лот получает вознаграждение, эквивалентное 100 Гб трафика
- коэффициент выигрыша может быть изменен владельцам премиум пула


## Техническая реализация

Средства для распределения лотереей аккумулируются в основном блокчейне в пуле вознаграждений (`uploadersRewardPool`) - это поле, привязанное к аккаунта бродкастера, пулу бродкастеров либо подписке. Пул вознаграждений пополняется системой учета трафика и времени - в момент оплаты трафика бродкастером либо контент-провайдером токены AceByte переводятся в этот пул. Содержимое этого пула распределяется между победителями в момент запуска лотереи.

Данные для формирования лотов хранятся в пуле вознаграждений в виде списка пар "userAccount → trafficAmount" (количество отданных единиц трафика для каждого пользователя).


[1]: ../list-of-operations/reward-uploaders.md