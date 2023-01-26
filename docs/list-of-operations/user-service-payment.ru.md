# User Service Payment

Модуль "User Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей в рамках взаиморасчетов за трафик и платежей для оплаты доступа к контенту.

## Алгоритм оплаты

- если на счету плательщика достаточно [XAT][1] для оплаты, то используются только [XAT][1]
- если на счету недостаточно [XAT][1], то разница оплачивается за счет [XAB][2]:
    - с помощью контракта [TrafficPriceManager][3] рассчитывается необходимое количество XAB
    - данное количество XAB списывается с плательщика
    - списанные XAB сжигаются, выполняется автоматическая эмиссия соответствующего количества XAT, которые зачисляются получателю платежа
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
    amount - amount of payment in XAT
    """
    if sourceAccount.balance.xat >= amount:
        # Source account has enough XAT

        # Move `amount` XAT from the source account to the target account
        sourceAccount.balance.xat -= amount
        targetAccount.balance.xat += amount
    else:
        # Source account doesn't have enough XAT

        # Amount of XAT the payer has
        xatAmount = sourceAccount.balance.xat

        # Amount of XAT needed to complete the payment
        xatToEmit = amount - xatAcount

        # Calculate amount of XAB required to mint one XAT
        xatPrice = TrafficPriceManager.getXATPrice()
        xabAmount = xatToEmit * xatPrice

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xatAmount` XAT from the source account to the target account
            sourceAccount.balance.xat -= xatAmount
            targetAccount.balance.xat += xatAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            # Emit `xatToEmit` XAT and add them to the target account
            targetAccount.balance.xat += xatToEmit

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


[1]: ../system-tokens/ace-time.md
[2]: ../system-tokens/ace-byte.md
[3]: ../list-of-operations/traffic-price-manager.md
[4]: ../system-tokens/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
