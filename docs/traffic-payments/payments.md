# Оплата трафика

==TODO: english version==

Трафик может быть оплачен любым из трех системных токенов: [XAC][5], [XAT][6], [XAS][7].

Оплата трафика выполняется автоматически со [счета для оплаты сервисов][1]
в рамках работы системы [учета трафика и времени][2]

Детали алгоритма оплаты описаны [здесь][5]

Сеть забирает комиссию 10% от каждого платежа по оплате трафика.
Комиссию оплачивает получатель платежа.
Комиссия перечисляется в системный пул [`trafficFeePool`][4]


[1]: ../glossary/special-accounts.md#_2
[2]: ../get-started/traffic-time-accounting.md
[4]: ../glossary/system-pools.md#trafficfeepool
[5]: ../system-tokens/ace-coin.md
[6]: ../system-tokens/ace-token.md
[7]: ../system-tokens/ace-asset.md