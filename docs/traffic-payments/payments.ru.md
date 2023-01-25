# Оплата трафика

Трафик может быть оплачен системными токенам [XAT][5] и [XAB][6].

Оплата трафика выполняется автоматически со [счета для оплаты сервисов][1]
в рамках работы системы [учета трафика и времени][2]

Сеть забирает комиссию 10% от каждого платежа по оплате трафика.
Комиссию оплачивает получатель платежа.
Комиссия перечисляется в системный пул [`trafficFeePool`][4]

За проведение оплаты отвечают системные смарт-контракты
[System Service Payment][7] и [User Service Payment][8].

Пример можно посмотреть [здесь][9]


[1]: ../glossary/special-accounts.md#_2
[2]: ../get-started/traffic-time-accounting.md
[4]: ../glossary/system-pools.md#trafficfeepool
[5]: ../system-tokens/ace-time.md
[6]: ../system-tokens/ace-byte.md
[7]: ../list-of-operations/system-service-payment.md
[8]: ../list-of-operations/user-service-payment.md
[9]: ../system-tokens/examples.md
