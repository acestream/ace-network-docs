# Ace Deposit

The system smart contract that redistributes tokens accumulated in system inflationary pool among special accounts of Ace Deposit program.

An operation can be initiated by any account, but the network will only accept one transaction every 7 days.

## Pseudocode

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

## Description

- the system pool [`inflationPool`][1] is being redistributed
- the distribution is performed between special Ace Deposit accounts that have not been changed for at least `ace_deposit_min_lock_interval` seconds
- the distribution is performed in proportion to the number of XATs locked in the special account
- distributed tokens are credited to the accounts that participates in the distribution
- during the operation, the special account is modified, so each such account will take part in the next distribution operation not earlier than after `ace_deposit_min_lock_interval` seconds
- after the distribution [`inflationPool`][1] resets to zero

[1]: ../glossary/system-pools.md#inflationpool
