# Premium Pool

A premium pool is one or more broadcasters who share a common billing policy. Technically, a premium pool is a blockchain-stored entity that has the following properties:

- list of owners
- list of broadcasters
- billing policy
- income redistribution policy

All properties can be changed only through the procedure of voting of pool's owners.


## Copyrights

Premium pools may be automatically dismantled if owners fail to provide evidence of copyright ownership. Ace Network has oracles entitled to resolve copyright disputes, and the majority of oracles can decide to stop premium pools because of copyright violations.


## Pool-specific Tokens

Pools are able to issue their own tokens. In that case, where owners had chosen to have their own token, the full amount of such tokens should be minted as part of the pool's creation procedure.

The pool may operate minted tokens as with local currency, for example — demand payment for the pool's content in the pool's tokens.


## Authomated exchange of pool specific-tokens

If a user wishes to pay for the pool's content with system tokens, the pool-specific tokens could be automatically bought on the system's internal [exchange][11].



## Pool creation

Any Ace Network's account is able to create pools by performing [Create Premium Pool][1] operation, that includes:

- confirming pool's properties
- deciding who should be billed for pool's traffic (either broadcasters or watchers)
- deciding if the pool would need its own token or not
- paying system fee of 1000XAT to create a pool with specified parameters

As a result, a special account to represent the newly created pool and store its parameters will be created. Owners of the pool will be signors of this special account.


## Broadcasting from the pools

If brodcaster is listed in pool's settings and want to start publishing content they have to specify pool's public key in transport file.

New broadcaster can be assigned to the pool by its owners or accounts to which the owners had delegated such rights.



## System pool

System pool is an open pool owned by the whole Ace Network.

Системный пул - это открытый пул, вдалельцем которого является вся Сеть.

The system pool settings are stored in the `system_premium_pool_settings` system setting, which could be altered by [changing the system settings][4] procedure.

Unlike regular premium pools, the billing settings of the system pool can be changed.

Any broadcaster is able to join the system pool.

System tokens are used to pay for content assigned to the system pool.


## Pool owners and pool participants

Pool owners are accounts that are authorized to change pool settings, list of owners, and list of participants. Pool owners initially own all tokens that were issued (if the pool had issued its own tokens when the pool was created).

Pool participants are the broadcasters assigned to the pool. The list of participants is stored in the pool settings. Only the pool owners can change the list of participants. The only exception is the system pool - any broadcaster can become its member.


## Network's commissions

In pools that issued their tokens, the network's commission applies only to token issuance - 30% of its total amount.
There is no commission taken for access to content in such pools.

In pools without their own tokens, the network commission is 30% of each payment for content access.



## Pool settings

Apart of other parameters, pool's settings specify:

- list of participants (brokers)
- income redistribution policy
- billing policies:
    - who pays for the traffic (broadcasters or users)
    - one-time access fee
    - per minute cost for the per minute billing
    - cost and duration of the subscription plan

The billing settings allow pool owners to enable or disable certain types of billing, as well as to create multiple access options. For example, owner can disable one-time access and per-minute charging, and offer two subscription options: for 30 and 360 days.

The cost of access can depend on the user's country, which can also be specified in the billing settings.

Billing policies are specified when creating a pool and cannot be changed later. If there is a need to change the terms of access to content, brand new pool should be created to provide new terms.

The billing policies apply to all content assigned to the pool.




## Распределение доходов в пуле

Премиум пул получает доход в виде платежей за доступ к контенту. Этот доход распределяется между бродкастерами данного пула согласно правил биллинга, описанных ниже.

Также в настройках пула можно опционально указывать аккаунты, которые будут получать отчисления от всех платежей за доступ к контенту в рамках пула.

Пример:

```json
{
  "shareholders": [
    {
      "account_id": "GCXVRWMPOXVHW34Q4DUCFYGEKCOHCJ6SKBMHC63SRTNM3QMDZUZQOSL4",
      "share": 0.1
    },
    {
      "account_id": "GACJFCLDILCE5KT3UZ5KX2NRPHFNCUTYZYRIZRRAEAC5O3GYZKIISSNO",
      "share": 0.05
    }
  ]
}
```

В данном примере аккаунт `GCXV...OSL4` будет получать 10% от доходов, аккаунт `GACJ...SSNO` - 5%.
Оставшиеся 85% будут распределяться между бродкастерами.


## Биллинг

### Подписка

Подписка предоставляет доступ к контенту в рамках пула на фиксированный период времени (например, на 30 дней). Доступ по подписке ограничен временем просмотра - не более 1000 минут в месяц.

Покупка подписки осуществляется операцией [Buy Subscription][5].

Подписка активируется в момент покупки.

Распределение средств от оплаты подписок осуществляется в два этапа.
Комиссия сети (для пулов без своих токенов) и доля аккаунтов, которые получают отчисления согласно настройкам пула (если такие есть), распределяется в момент покупки подписки.
Доля бродкастеров распределяется системным смарт-контрактом [Distribute Subscriptions][6] после окончания срока действия подписки. Доля бродкастеров распределяется между бродкастерами, контент которых смотрел пользователь подписки за период ее действия, пропорционально времени просмотра. Детали алгоритма распределения смотрите в описании смарт-контракта.


### Поминутная тарификация

Предусматривает оплату за каждую минуту просмотра контента. Средства списываются со счета для оплаты сервисов пользователя, который смотрит контент. Распределение средств выполняется в момент оплаты. Доля бродкастера зачисляется на его счет в момент оплаты.

Списание и распределение средств осуществляется блокчейном второго уровня в рамках системы [учета трафика и времени][7].


### Разовый доступ

Предоставляет доступ к одной конкретной единице контента.

Логика работы разового доступа зависит от типа контента:

- VOD - доступ предоставляется навсегда
- Live - доступ предоставляется на фиксированное время (это время указано в настройках биллинга)

Покупка разового доступа осуществляется операцией [Buy Single Access][8]. Эта же операция выполняет распределение средств. Средства списываются со счета для оплаты сервисов пользователя, который смотрит контент. Распределение средств выполняется в момент оплаты. Доля бродкастера зачисляется на его счет в момент оплаты.

Разовый доступ активируется в момент покупки.


## Оплата трафика

В настройках премиум пула есть возможность выбора стороны, оплачивающей трафик: пользователь либо бродкастер.

Если трафик оплачивают пользователи, то расчеты за трафик выполняются по обычной схеме (точно так же, как для контента, не входящего в премиум пул).

Оплата трафика бродкастерами выполняется по такой схеме:

- весь трафик оплачивается со специального счета бродкастера
- узлы, потребляющие трафик, ничего не платят
- узлы, отдающие трафик, могут получить вознаграждение по системе "лотерея" (подробное описание [здесь][9])


## Content access control

Access control is fully decentralized and is carried out by network nodes. Each node that participates in the premium pool's data transmission checks whether its remote peer has been authorized to access this content accordingly to the pool settings.



[1]: ../list-of-operations/create-premium-pool.md
[2]: #_3
[3]: ../glossary/transport-file.md
[4]: ../glossary/system-settings.md
[5]: ../list-of-operations/buy-subscription.md
[6]: ../list-of-operations/distribute-subscriptions.md
[7]: ../get-started/traffic-time-accounting.md
[8]: ../list-of-operations/buy-single-access.md
[9]: ../traffic-payments/broadcaster-payments.md
[10]: #_7
[11]: ../system-tokens/exchange.md
