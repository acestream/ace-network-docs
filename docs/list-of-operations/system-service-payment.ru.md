# System Service Payment

Модуль "System Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей за услуги и сервисы Ace Network.

Данный смарт-контракт используется исключительно для обработки платежей в пользу
Ace Network. Следует отметить, что сюда не попадают любые взаиморасчеты между
пользователями Сети, а также платежи за сервисы, в которых DAO Ace Stream не
получает комиссию (например, системные платежи в рамках биржевого рынка
прогнозов).


## Алгоритм оплаты

- если на счету плательщика достаточно [XAT][1] для оплаты, то используются только [XAT][1]
- если на счету недостаточно [XAT][1], то разница оплачивается за счет [XAB][2]:
    - с помощью контракта [TrafficPriceManager][3] рассчитывается необходимое количество XAB
    - данное количество XAB списывается с плательщика и сжигается
    - если в [`lockedPool`][5] есть такое же количество XAB, то они вводятся в оборот (перемещаются из [`lockedPool`][5] в [`unlockedPool`][6])
    - если [`lockedPool`][5] пустой (т.е. все XAB уже разблокированы), то выполняется автоматическая эмиссия соответствующего количества XAT, которые переводятся в системный пул `targetPool` для последующего распределения между участниками программы [Ace Assets][4]


## Псевдокод

```python

def makeSystemServicePayment(sourceAccount, amount, targetPool):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAT
    targetPool - system pool that will receive the payment
    """
    if sourceAccount.balance.xat >= amount:
        # Source account has enough XAT

        # Move `amount` XAT from the source account to the target pool
        sourceAccount.balance.xat -= amount
        targetPool.balance.xat += amount
    else:
        # Source account doesn't have enough XAT

        # Amount of XAT user has
        xatAmount = sourceAccount.balance.xat

        # Amount of XAT needed to complete the payment
        amountLeft = amount - xatAcount

        # Calculate amount of XAB required to mint one XAT
        xatPrice = TrafficPriceManager.getXATPrice()
        xabAmount = amountLeft * xatPrice

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xatAmount` XAT from the source account to the target pool
            sourceAccount.balance.xat -= xatAmount
            targetPool.balance.xat += xatAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            if System.lockedPool.amount >= xabAmount:
                # Unlock `xabAmount` XAB
                System.lockedPool.amount -= xabAmount
                System.unlockedPool.amount += xabAmount
            else:
                # How many XAB to unlock (all available)
                toUnlock = System.lockedPool.amount

                # How many XAB should be replaced with XAT
                xabToReplace = xabAmount - toUnlock

                # Unlock `toUnlock` XAB
                if toUnlock > 0:
                    System.lockedPool.amount -= toUnlock
                    System.unlockedPool.amount += toUnlock

                # emit `xatToEmit` XAT based on `xatPrice`
                xatToEmit = xabToReplace / xatPrice
                targetPool.balance.xat += xatToEmit
        else:
            raise Exception('not enough tokens')

```

## Примеры

Примеры можно посмотреть [здесь][7]


[1]: ../system-tokens/ace-time.md
[2]: ../system-tokens/ace-byte.md
[3]: ../list-of-operations/traffic-price-manager.md
[4]: ../services/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
