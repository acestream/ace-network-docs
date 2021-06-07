# Ace Deposit

Запускает механизм распределения инфляционного пула между специальным счетами Ace Deposit.

Эта операция является системным смарт-контрактом.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 7 дней.

## Псевдокод

```python

# find target accounts
targetAccounts = [ account in system.accounts if
    account.homedomain = 'ace-deposit.acestream.network'
    and account.lastmodified <= now() - SystemSettings.ace_deposit_min_lock_interval
    ]

# distribute inflation pool among target accounts
totalDepositTokens = sum(account.tokens in targetAccounts)
for account in targetAccounts:
    account.tokens += inflationPool.amount * account.tokens / totalDepositTokens
    account.lastmodified = now()

# empty inflation pool
inflationPool.empty()
```

## Описание

- распределяется системный пул [`inflationPool`][1]
- распределение выполняется между специальными счетами Ace Deposit, которые не изменялись как минимум `ace_deposit_min_lock_interval` секунд
- распределение выполняется пропорционально количеству XAT на специальном счете
- токены, полученные в результате распределения, начисляются на тот же счет, который участвует в распределении
- в ходе операции специальный счет модифицируется, поэтому каждый такой счет будет принимать участие в следующей операции распределения не ранее, чем черех `ace_deposit_min_lock_interval` секунд
- после распределения [`inflationPool`][1] обнуляется

[1]: ../glossary/system-pools.md#inflationpool