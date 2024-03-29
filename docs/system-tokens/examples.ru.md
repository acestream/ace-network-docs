# Примеры

В данном разделе приведены примеры использования системных токенов Ace Time
([XAT][1]) и Ace Byte ([XAB][2]) для взаиморасчетов за трафик.


## Взаиморасчет за трафик

Для примера рассмотрим взаиморасчет за трафик между двумя аккаунтами.

- аккаунт A: просматривал мультимедийный (видео+аудио) контент в течение 100 часов и потребил трафик в объеме 300 Гб
- аккаунт B: отдал аккаунту А трафик в объеме 300 Гб
- стоимость трафика: 3 XAB (поскольку 1 XAB = 100 Гб трафика)
- комиссия сети: 10%
- текущий средний уровень потребления мультимедийного трафика: 3 Гб/час


### Вариант 1: оплата токенами AceByte

В случае оплаты токенами AceByte необходимая сумма снимается с аккаунта A и
переводится на аккаунт B за вычетом комиссии системы:

- с аккаунта А снимается 3 XAB
- комиссия сети (10% = 0.3 XAB) распределяется по программе Ace Assets
- аккаунту B начисляется 2.7 XAB


### Вариант 2: оплата токенами AceTime

Оплата трафика токенами AceTime возможна только в случае, когда в расчетах
используются сторонние токены, инкапсулирующие токен AceTime (например, токены
правообладателей в протоколе [Ace Maker][4]).

В момент использования токена правообладателя из него высвобождается токен AceTime,
который сжигается и превращается в 0.03 AceByte (это количество AceByte, необходимое
для оплаты 3 Гб трафика - объем трафика за час просмотра при текущем среднем уровне
потребления 3 Гб/час).

Итак, рассмотрим вариант, когда аккаунт А использовал 100 токенов правообладателя
для доступа к контенту и соответственно было высвобождено 100 AceTimeMultimedia для оплаты
трафика:

- 100 AceTimeMultimedia сжигаются и создаются 3 XAB (это выполняет контракт [AceTimeManager][3])
- комиссия сети (10% = 0.3 XAB) распределяется по программе Ace Assets
- аккаунту B начисляется 2.7 XAB


[1]: ace-time.md
[2]: ace-byte.md
[3]: ../list-of-operations/ace-time-manager.md
[4]: https://acemakerdao.com/