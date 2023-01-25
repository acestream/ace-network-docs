# User Service Payment

Модуль "User Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей в рамках взаиморасчетов за трафик и платежей для оплаты доступа к контенту.

## Алгоритм оплаты

- если на счету плательщика достаточно [XAC][1] для оплаты, то используются только [XAC][1]
- если на счету недостаточно [XAC][1], то разница оплачивается за счет [XAB][2]:
    - с помощью [модуля обмена][3] рассчитывается необходимое количество XAB
    - данное количество XAB списывается с плательщика
    - списанные XAB сжигаются, выполняется автоматическая эмиссия соответствующего количества XAC, которые зачисляются получателю платежа
    - если [`lockedPool`][5] не пустой, такое же количество XAB вводится в оборот (перемещается из [`lockedPool`][5] в [`unlockedPool`][6])

<!--
- если на счету недостаточно [XAB][2], то разница может оплачиваться за счет [XAS][4]
    - с помощью модуля обмена токенов рассчитывается необходимое количество [XAS][4]
    - данное количество [XAS][4] списывается с плательщика и зачисляется получателю
-->


## Псевдокод

```python

def makeUserServicePayment(sourceAccount, targetAccount, amount):
    """
    sourceAccount - the payer account
    targetAccount - the payee account
    amount - amount of payment in XAC
    """
    if sourceAccount.balance.xac >= amount:
        # Source account has enough XAC

        # Move `amount` XAC from the source account to the target account
        sourceAccount.balance.xac -= amount
        targetAccount.balance.xac += amount
    else:
        # Source account doesn't have enough XAC

        # Amount of XAC the payer has
        xacAmount = sourceAccount.balance.xac

        # Amount of XAC needed to complete the payment
        xacToEmit = amount - xacAcount

        # Amount of XAB needed based on system DEX exchange rate
        exchangeRate = DEX.getRate('XAC', 'XAB')
        xabAmount = xacToEmit * exchangeRate

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xacAmount` XAC from the source account to the target account
            sourceAccount.balance.xac -= xacAmount
            targetAccount.balance.xac += xacAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            # Emit `xacToEmit` XAC and add them to the target account
            targetAccount.balance.xac += xacToEmit

            # Unlock at most `xabAmount` XAB
            toUnlock = min(xabAmount, System.lockedPool.amount)
            if toUnlock > 0:
                System.lockedPool.amount -= toUnlock
                System.unlockedPool.amount += toUnlock
        else:
            raise Exception('not enough tokens')

```

## Примеры

Примеры можно посмотреть [здесь][7]


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-byte.md
[3]: ../system-tokens/exchange.md
[4]: ../system-tokens/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
