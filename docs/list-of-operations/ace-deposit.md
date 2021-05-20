# Ace Deposit

Запускает механизм распределения инфляционного пула между специальным счетами Ace Deposit.

Операция может быть запущена любым аккаунтом, но сеть примет только одну операцию раз в 7 дней.

## Псевдокод

```

# find target accounts
targetAccounts = { get accounts where
   account.homedomain = 'ace-deposit.acestream.network'
   and account.lastmodified <= now() - 28*86400 }

# distribute inflation pool among target accounts
totalDepositTokens = sum(account.tokens in targetAccounts)
for (account in targetAccounts) {
  account.tokens += inflationPool.amount * account.tokens / totalDepositTokens
  account.lastmodified = now()
}

# empty inflation pool
inflationPool.empty()
```

## Описание

- распределяется системный пул [`inflationPool`][1]
- распределение выполняется между специальными счетами Ace Deposit, которые не изменялись как минимум 28 дней
- распределение выполняется пропорционально количеству XAT на специальном счете
- токены, полученные в результате распределения, начисляются на тот же счет, который участвует в распределении
- в ходе операции специальный счет модифицируется, поэтому каждый такой счет будет принимать участие в следующей операции распределения не ранее, чем черех 28 дней
- после распределения [`inflationPool`][1] обнуляется

[1]: ../glossary/system-pools.md#inflationpool