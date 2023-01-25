# User Service Payment

The "User Service Payment" module is a system smart contract responsible for processing payments related to traffic accounting and content access.

## Payment Algorithm

- if the payer has enough [XAC][1] then only [XAC][1] are used
- if the payer is short of XAC then the difference is paid with [XAB][2]:
    - the required amount of XAB is calculated with the [exchange module][3]
    - this amount of XAB is being charged from the payer
    - all the charged XAB are burned, the corresponding amount of XAC is automatically created and credited to the payee
    - if the [`lockedPool`][5] is not empty then the same amount of XAB is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])


## Pseudocode

```python

def makeUserServicePayment(sourceAccount, targetAccount, amount):
    """
    sourceAccount - the payer account
    targetAccount - the payee account
    amount - amount of payment in XAC
    """
    if sourceAccount.balance.xac >= amount:
        # Source account has enough XAC

        # Move `amount` XAC from the source account to the target account
        sourceAccount.balance.xac -= amount
        targetAccount.balance.xac += amount
    else:
        # Source account doesn't have enough XAC

        # Amount of XAC the payer has
        xacAmount = sourceAccount.balance.xac

        # Amount of XAC needed to complete the payment
        xacToEmit = amount - xacAcount

        # Amount of XAB needed based on system DEX exchange rate
        exchangeRate = DEX.getRate('XAC', 'XAB')
        xabAmount = xacToEmit * exchangeRate

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xacAmount` XAC from the source account to the target account
            sourceAccount.balance.xac -= xacAmount
            targetAccount.balance.xac += xacAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            # Emit `xacToEmit` XAC and add them to the target account
            targetAccount.balance.xac += xacToEmit

            # Unlock at most `xabAmount` XAB
            toUnlock = min(xabAmount, System.lockedPool.amount)
            if toUnlock > 0:
                System.lockedPool.amount -= toUnlock
                System.unlockedPool.amount += toUnlock
        else:
            raise Exception('not enough tokens')

```

## Examples

Examples are available [here][7]


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-byte.md
[3]: ../system-tokens/exchange.md
[4]: ../system-tokens/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
