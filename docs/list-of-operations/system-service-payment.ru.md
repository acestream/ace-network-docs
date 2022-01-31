# System Service Payment

Модуль "System Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей за услуги и сервисы Ace Network.

Данный смарт-контракт используется исключительно для обработки платежей в пользу
Ace Network. Следует отметить, что сюда не попадают любые взаиморасчеты между
пользователями Сети, а также платежи за сервисы, в которых DAO Ace Stream не
получает комиссию (например, системные платежи в рамках биржевого рынка
прогнозов).


## Алгоритм оплаты

- если на счету плательщика достаточно [XAC][1] для оплаты, то используются только [XAC][1]
- если на счету недостаточно [XAC][1], то разница оплачивается за счет [XAT][2]:
    - с помощью [модуля обмена][3] рассчитывается необходимое количество XAT
    - данное количество XAT списывается с плательщика и сжигается
    - если в [`lockedPool`][5] есть такое же количество XAT, то они вводятся в оборот (перемещаются из [`lockedPool`][5] в [`unlockedPool`][6])
    - если [`lockedPool`][5] пустой (т.е. все XAT уже разблокированы), то выполняется автоматическая эмиссия соответствующего количества XAC, которые переводятся в системный пул `targetPool` для последующего распределения между участниками программы [Ace Assets][4]


## Псевдокод

```python

def makeSystemServicePayment(sourceAccount, amount, targetPool):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAC
    targetPool - system pool that will receive the payment
    """
    if sourceAccount.balance.xac >= amount:
        # Source account has enough XAC

        # Move `amount` XAC from the source account to the target pool
        sourceAccount.balance.xac -= amount
        targetPool.balance.xac += amount
    else:
        # Source account doesn't have enough XAC

        # Amount of XAC user has
        xacAmount = sourceAccount.balance.xac

        # Amount of XAC needed to complete the payment
        amountLeft = amount - xacAcount

        # Amount of XAT needed based on system DEX exchange rate
        exchangeRate = DEX.getRate('XAC', 'XAT')
        xatAmount = amountLeft * exchangeRate

        if sourceAccount.balance.xat >= xatAmount:
            # Move `xacAmount` XAC from the source account to the target pool
            sourceAccount.balance.xac -= xacAmount
            targetPool.balance.xac += xacAmount

            # Burn `xatAmount` XAT from the source account
            sourceAccount.balance.xat -= xatAmount
            System.BLACKHOLE.balance.xat += xatAmount

            if System.lockedPool.amount >= xatAmount:
                # Unlock `xatAmount` XAT
                System.lockedPool.amount -= xatAmount
                System.unlockedPool.amount += xatAmount
            else:
                # How many XAT to unlock (all available)
                toUnlock = System.lockedPool.amount

                # How many XAT should be replaced with XAC
                xatToReplace = xatAmount - toUnlock

                # Unlock `toUnlock` XAT
                if toUnlock > 0:
                    System.lockedPool.amount -= toUnlock
                    System.unlockedPool.amount += toUnlock

                # emit `xacToEmit` XAC based on system DEX exchage rate
                xacToEmit = xatToReplace / exchangeRate
                targetPool.balance.xac += xacToEmit
        else:
            raise Exception('not enough tokens')

```


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-token.md
[3]: exchange.md
[4]: ../services/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
