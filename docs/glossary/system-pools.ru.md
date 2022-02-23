# Системные пулы

Системный пул - это место аккумуляции токенов из различных источников для их дальнейшего распределения согласно условиям системных смарт-контрактов. Каждый пул - это некий счет, к которому есть доступ только у системных смарт-контрактов. Технически каждый пул представляет собой поле в структуре `LedgerHeader`.


### lockedPool

Токен: [XAT][1]

Пополняется единоразово в момент запуска сети (подробности в разделе [Ace Token][1])

Данный пул предназначен для контроля количества Ace Token в обороте. Все токены в данном пуле заблокированы - не могут быть использованы ни одним аккаунтом. Токены из данного пула разблокируются (выводятся в оборот) в момент сжигания Ace Token в процессе работы следующих смарт-контрактов:

- [System Service Payment][10]
- [Non System Service Payment][11]
- [User Service Payment][12]
- [Add Broadcasting Rights Contract][13]


### unlockedPool

Токен: [XAT][1]

В данный пул попадают токены из `lockedPool` в момент разблокирования.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


### inflationPool

Токен: [XAT][1]

Пополняется смарт-контрактом [Inflation][5]

Распределяется смарт-контрактом [Ace Deposit][6] в рамках программы [Ace Deposit][7]


### txFeePool

Токен: [XAT][1]

Пополняется за счет комиссий на транзакции между пользователями.

На данный момент не распределяется.

В будущем планируется распределение этого пула между валидаторами второго уровня.


### trafficFeePool

Токен: [XAC][8], [XAS][9]

Пополняется за счет комиссий на транзакции по расчету за трафик.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


### contentAccessFeePool

Токен: [XAC][8], [XAS][9]

Пополняется за счет комиссий на транзакции по оплате доступа к контенту.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


### premiumFeePool

Токен: [XAT][1], [XAC][8], токены пулов

Пополняется за счет комиссий, связанных с работой премиум пулов.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


[1]: ../system-tokens/ace-token.md
[3]: ../list-of-operations/ace-asset.md
[4]: ../services/ace-asset.md
[5]: ../list-of-operations/inflation.md
[6]: ../list-of-operations/ace-deposit.md
[7]: ../services/ace-deposit.md
[8]: ../system-tokens/ace-coin.md
[9]: ../system-tokens/ace-asset.md
[10]: ../list-of-operations/system-service-payment.md
[11]: ../list-of-operations/non-system-service-payment.md
[12]: ../list-of-operations/user-service-payment.md
[13]: ../list-of-operations/add-broadcasting-rights-contract.md
