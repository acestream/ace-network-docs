# Примеры

В данном разделе приведены примеры использования системных токенов Ace Coin
([XAC][1]) и Ace Token ([XAT][2]) для оплаты услуг Сети и взаиморасчетов
за трафик.

Примеры дают представление о том, как работает автоматическая эмиссия токенов
Ace Coin и сжигание токенов Ace Tokens.

За проведение операций, описанных в примерах, отвечают системные смарт-контракты
[System Service Payment][3] и [User Service Payment][4].


## Взаиморасчет за трафик

Для примера рассмотрим взаиморасчет за трафик между двумя аккаунтами.

- аккаунт A: потребил трафик
- аккаунт B: отдал трафик
- стоимость трафика: 10 XAC
- комиссия сети: 10%
- курс обмена на системной децентрализованной бирже: 1 XAC = 2 XAT


### Вариант 1: оплата XAC

Данные:

- на счету аккаунта А: 10 XAC

В этом варианте у аккаунта А достаточно XAC для оплаты, поэтому автоматическая
эмиссия XAC не выполняется:

- с аккаунта А снимается 10 XAC
- комиссия сети (1 XAC) распределяется по программе Ace Assets
- аккаунту B начисляется 9 XAC


### Вариант 2: оплата XAT

Данные:

- на счету аккаунта А: 20 XAT

В этом варианте у аккаунта А нет XAC, поэтому для оплаты используются только XAT:

- с аккаунта А снимается 20 XAT (эквивалент 10 XAC согласно системному курсу)
- комиссия сети (2 XAT) сжигается
    - если в сети есть заблокированные 2 XAT, они вводятся в оборот (разблокируются и распределяются по программе Ace Assets)
    - если в сети нет заблокированных XAT - выполняется автоматическая эмиссия 1 XAC (эквивалент 2 XAT согласно системному курсу), которые распределяются в программе Ace Assets
- платеж аккаунту B
    - 18 XAT сжигаются и выполняется автоматическая эмиссия 9 XAC, которые начисляются аккаунту B
    - если в сети есть заблокированные 18 XAT, они вводятся в оборот (разблокируются и распределяются по программе Ace Assets)


### Вариант 3: оплата XAT+XAC

Данные:

- на счету аккаунта А: 2 XAC и 16 XAT

В этом варианте у аккаунта А есть XAC, но их недостаточно для оплаты. Для оплаты
разницы используются XAT:

- с аккаунта А снимается 2 XAC и 16 XAT (эквивалент 8 XAC согласно системному курсу)
- комиссия сети (2 XAT) сжигается
    - если в сети есть заблокированные 2 XAT, они вводятся в оборот (разблокируются и распределяются по программе Ace Assets)
    - если в сети нет заблокированных XAT - выполняется автоматическая эмиссия 1 XAC (эквивалент 2 XAT согласно системному курсу), которые распределяются в программе Ace Assets
- платеж аккаунту B
    - 2 XAC переводятся напрямую с аккаунта А на аккаунт B
    - 14 XAT сжигаются и выполняется автоматическая эмиссия 7 XAC, которые начисляются аккаунту B
    - если в сети есть заблокированные 14 XAT, они вводятся в оборот (разблокируются и распределяются по программе Ace Assets)


[1]: ace-coin.md
[2]: ace-token.md
[3]: ../list-of-operations/system-service-payment.md
[4]: ../list-of-operations/user-service-payment.md