# Inflation


XAT inflation tokens are issued weekly, automatically, according to the terms of the [Inflation][1] smart contract that implements the following formula:

```python
inflationAmount = (totalTokens - lockedTokens) * 0.000190721
```
where

- `inflationAmount` - volume of weekly issuance
- `totalTokens` - the total number of XATs in the system at the time of launching the inflation operation (100 billion + the total amount of inflation tokens from all previous issues)
- `lockedTokens` - the number of XATs that have not yet been released into circulation (locked in the system pool [`lockedPool`][2])

The inflation is 1% per year (or 0.0190721% per week) of the XATs released into circulation.

The XATs issued by inflation procedure are transferred to the system pool [`inflation pool'][3]
and are subjects of further distribution performed by [Ace Deposit][3] smart contract.



[1]: ../list-of-operations/inflation.md
[2]: ../glossary/system-pools.md#lockedpool
[3]: ../glossary/system-pools.md#inflationpool
[4]: ../list-of-operations/ace-deposit.md
