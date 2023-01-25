# Non System Service Payment

The "Non System Service Payment" module is a system smart contract responsible for processing payments related to services in which DAO Ace Stream does not receive a fee (for example, system payments related to prediction market).

All the payments in this category are done in [XAB][2] only.

Payment with [XAC][1] is possible, but in such case the network performs an automatic exchange
XAC -> XAB on built-in DEX (decentralized exchange) before making a transaction.
Such an exchange is outside the scope of this smart contract, therefore, in this section
only payment in XAB is described.


## Payment Algorithm

- if the payer has enough [XAB][2] then:
    - the required amount of XAB is being charged from the payer and burned
    - if the [`lockedPool`][5] is not empty then the same amount of XAB is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])
- if the payer doesn't has enough [XAB][2] then the transaction is declined


## Pseudocode

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


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-byte.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
