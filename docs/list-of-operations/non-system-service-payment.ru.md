# Non System Service Payment

Модуль "Non System Service Payment" является системным смарт-контрактом, который отвечает за
обработку платежей за сервисы, в которых DAO Ace Stream не получает комиссию
(например, системные платежи в рамках биржевого рынка прогнозов).

Все платежи в этой категории проводятся исключительно в [XAT][2].

Оплата [XAC][1] возможна, но в данном случае сеть выполняет автоматический обмен
XAC -> XAT на встроенной децентрализованной бирже перед проведением транзакции.
Такой обмен происходит за рамками данного смарт-контракта, поэтому в данном разделе
описан только платеж в XAT.


## Алгоритм оплаты

- если на счету плательщика достаточно [XAT][2] для оплаты, то:
    - данное количество XAT списывается с плательщика и сжигается
    - если [`lockedPool`][5] не пустой, такое же количество XAT вводится в оборот (перемещается из [`lockedPool`][5] в [`unlockedPool`][6])
- если на счету плательщика недостаточно [XAT][2] для оплаты, транзакция не может быть проведена


## Псевдокод

```python

def makeNonSystemServicePayment(sourceAccount, amount):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAT
    """
    if sourceAccount.balance.xat >= amount:
        # Burn `amount` XAT from the source account
        sourceAccount.balance.xat -= amount
        System.BLACKHOLE.balance.xat += amount

        # Unlock at most `amount` XAT
        toUnlock = min(amount, System.lockedPool.amount)
        if toUnlock > 0:
            System.lockedPool.amount -= toUnlock
            System.unlockedPool.amount += toUnlock
    else:
        raise Exception('not enough tokens')

```


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-token.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
