# System Service Payment

The "System Service Payment" module is a system smart contract responsible for processing payments for services of Ace Network.

This smart contract is used solely for processing payments in favor of
Ace Network. It should be noted that this does not include any mutual payments between
network users, as well as payments for services in which DAO Ace Stream does not
receive a fee (for example, system payments related to prediction market).


## Payment Algorithm

- if the payer has enough [XAT][1] then only [XAT][1] are used
- if the payer is short of XAT then the difference is paid with [XAB][2]:
    - the required amount of XAB is calculated with the [exchange module][3]
    - this amount of XAB is being charged from the payer and burned
    - if the [`lockedPool`][5] is not empty then the same amount of XAB is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])
    - if the [`lockedPool`][5] is empty (i.e. all XAB are already unlocked) then the corresponding amount of XAT is automatically created and credited to the system pool `targetPool` (to be distributed by the terms of [Ace Assets][4])


## Pseudocode

```python

def makeSystemServicePayment(sourceAccount, amount, targetPool):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAT
    targetPool - system pool that will receive the payment
    """
    if sourceAccount.balance.xat >= amount:
        # Source account has enough XAT

        # Move `amount` XAT from the source account to the target pool
        sourceAccount.balance.xat -= amount
        targetPool.balance.xat += amount
    else:
        # Source account doesn't have enough XAT

        # Amount of XAT user has
        xatAmount = sourceAccount.balance.xat

        # Amount of XAT needed to complete the payment
        amountLeft = amount - xatAcount

        # Amount of XAB needed based on system DEX exchange rate
        exchangeRate = DEX.getRate('XAT', 'XAB')
        xabAmount = amountLeft * exchangeRate

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xatAmount` XAT from the source account to the target pool
            sourceAccount.balance.xat -= xatAmount
            targetPool.balance.xat += xatAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            if System.lockedPool.amount >= xabAmount:
                # Unlock `xabAmount` XAB
                System.lockedPool.amount -= xabAmount
                System.unlockedPool.amount += xabAmount
            else:
                # How many XAB to unlock (all available)
                toUnlock = System.lockedPool.amount

                # How many XAB should be replaced with XAT
                xabToReplace = xabAmount - toUnlock

                # Unlock `toUnlock` XAB
                if toUnlock > 0:
                    System.lockedPool.amount -= toUnlock
                    System.unlockedPool.amount += toUnlock

                # emit `xatToEmit` XAT based on system DEX exchage rate
                xatToEmit = xabToReplace / exchangeRate
                targetPool.balance.xat += xatToEmit
        else:
            raise Exception('not enough tokens')

```

## Examples

Examples are available [here][7]


[1]: ../system-tokens/ace-time.md
[2]: ../system-tokens/ace-byte.md
[3]: ../system-tokens/exchange.md
[4]: ../services/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
