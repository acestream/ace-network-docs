# Non System Service Payment

Модуль "Non System Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей за сервисы, в которых DAO Ace Stream не получает комиссию
(например, системные платежи в рамках биржевого рынка прогнозов).

Все платежи в этой категории проводятся исключительно в [XAB][2].

Оплата [XAT][1] возможна, но в данном случае сеть выполняет автоматический обмен
XAT -> XAB на встроенной децентрализованной бирже перед проведением транзакции.
Такой обмен происходит за рамками данного смарт-контракта, поэтому в данном разделе
описан только платеж в XAB.


## Алгоритм оплаты

- если на счету плательщика достаточно [XAB][2] для оплаты, то:
    - данное количество XAB списывается с плательщика и сжигается
    - если [`lockedPool`][5] не пустой, такое же количество XAB вводится в оборот (перемещается из [`lockedPool`][5] в [`unlockedPool`][6])
- если на счету плательщика недостаточно [XAB][2] для оплаты, транзакция не может быть проведена


## Псевдокод

```python

def makeNonSystemServicePayment(sourceAccount, amount):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAB
    """
    if sourceAccount.balance.xab >= amount:
        # Burn `amount` XAB from the source account
        sourceAccount.balance.xab -= amount
        System.BLACKHOLE.balance.xab += amount

        # Unlock at most `amount` XAB
        toUnlock = min(amount, System.lockedPool.amount)
        if toUnlock > 0:
            System.lockedPool.amount -= toUnlock
            System.unlockedPool.amount += toUnlock
    else:
        raise Exception('not enough tokens')

```


[1]: ../system-tokens/ace-time.md
[2]: ../system-tokens/ace-byte.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
