# Inflation

The system smart contract that initiate inflation. Can be started by any account, but the network will only accept one transaction every 7 days.

The operation creates XABs to the extent of 1% per year of the total amount of XABs in circulation and places the created tokens in an inflationary system pool.

## Pseudocode

```python
inflationPool.amount += (totalTokens - lockedPool.amount) * 0.000190721
```

## Description

- [`inflationPool`][1] is replenished by an amount equal to 0.0190721% of the number of XABs in circulation. This is about 1% per year, since the inflation operation is being triggered once a week
- the number of XABs in circulation is the total number of XABs had beenissued (including tokens issued during inflation) minus the number of locked tokens (i.e., the amount of tokens in [`lockedPool`][2])

[1]: ../glossary/system-pools.md#inflationpool
[2]: ../glossary/system-pools.md#lockedpool
