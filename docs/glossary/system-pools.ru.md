# Системные пулы

Системный пул - это место аккумуляции токенов из различных источников для их дальнейшего распределения согласно условиям системных смарт-контрактов. Каждый пул - это некий счет, к которому есть доступ только у системных смарт-контрактов. Технически каждый пул представляет собой поле в структуре `LedgerHeader`.


### lockedPool

Токен: [XAB][1]

Пополняется единоразово в момент запуска сети (подробности в разделе [Ace Byte][1])

Данный пул предназначен для контроля количества Ace Byte в обороте. Все токены в данном пуле заблокированы - не могут быть использованы ни одним аккаунтом. Токены из данного пула разблокируются (выводятся в оборот) в момент сжигания Ace Byte в процессе работы следующих смарт-контрактов:

- [System Service Payment][10]
- [Non System Service Payment][11]
- [User Service Payment][12]
- [Add Broadcasting Rights Contract][13]


### unlockedPool

Токен: [XAB][1]

В данный пул попадают токены из `lockedPool` в момент разблокирования.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]

### xasLockedPool

Токен: [XAS][9]

Пополняется в момент эмиссии XAS (подробности в разделе [Ace Asset][9])

Токены в данном пуле заблокированы - не могут быть использованы ни одним аккаунтом. Токены из данного пула могут быть разблокированы исключительно смарт-контрактом [Unlock System Tokens][14]

### inflationPool

Токен: [XAB][1]

Пополняется смарт-контрактом [Inflation][5]

Распределяется смарт-контрактом [Ace Deposit][6] в рамках программы [Ace Deposit][7]


### txFeePool

Токен: [XAB][1]

Пополняется за счет комиссий на транзакции между пользователями.

На данный момент не распределяется.

В будущем планируется распределение этого пула между валидаторами второго уровня.


### trafficFeePool

Токен: [XAT][8], [XAS][9]

Пополняется за счет комиссий на транзакции по расчету за трафик.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


### contentAccessFeePool

Токен: [XAT][8], [XAS][9]

Пополняется за счет комиссий на транзакции по оплате доступа к контенту.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


### premiumFeePool

Токен: [XAB][1], [XAT][8], токены пулов

Пополняется за счет комиссий, связанных с работой премиум пулов.

Распределяется смарт-контрактом [Ace Asset][3] в рамках программы [Ace Asset][4]


[1]: ../system-tokens/ace-byte.md
[3]: ../list-of-operations/ace-asset.md
[4]: ../services/ace-asset.md
[5]: ../list-of-operations/inflation.md
[6]: ../list-of-operations/ace-deposit.md
[7]: ../services/ace-deposit.md
[8]: ../system-tokens/ace-time.md
[9]: ../system-tokens/ace-asset.md
[10]: ../list-of-operations/system-service-payment.md
[11]: ../list-of-operations/non-system-service-payment.md
[12]: ../list-of-operations/user-service-payment.md
[13]: ../list-of-operations/add-broadcasting-rights-contract.md
[14]: ../list-of-operations/unlock-system-tokens.md
