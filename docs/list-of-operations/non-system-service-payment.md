# Non System Service Payment

The "Non System Service Payment" module is a system smart contract responsible for processing payments related to services in which DAO Ace Stream does not receive a fee (for example, system payments related to prediction market).

All the payments in this category are done in [XAT][2] only.

Payment with [XAC][1] is possible, but in such case the network performs an automatic exchange
XAC -> XAT on built-in DEX (decentralized exchange) before making a transaction.
Such an exchange is outside the scope of this smart contract, therefore, in this section
only payment in XAT is described.


## Payment Algorithm

- if the payer has enough [XAT][2] then:
    - the required amount of XAT is being charged from the payer and burned
    - if the [`lockedPool`][5] is not empty then the same amount of XAT is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])
- if the payer doesn't has enough [XAT][2] then the transaction is declined


## Pseudocode

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
