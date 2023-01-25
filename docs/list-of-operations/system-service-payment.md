# System Service Payment

The "System Service Payment" module is a system smart contract responsible for processing payments for services of Ace Network.

This smart contract is used solely for processing payments in favor of
Ace Network. It should be noted that this does not include any mutual payments between
network users, as well as payments for services in which DAO Ace Stream does not
receive a fee (for example, system payments related to prediction market).


## Payment Algorithm

- if the payer has enough [XAC][1] then only [XAC][1] are used
- if the payer is short of XAC then the difference is paid with [XAB][2]:
    - the required amount of XAB is calculated with the [exchange module][3]
    - this amount of XAB is being charged from the payer and burned
    - if the [`lockedPool`][5] is not empty then the same amount of XAB is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])
    - if the [`lockedPool`][5] is empty (i.e. all XAB are already unlocked) then the corresponding amount of XAC is automatically created and credited to the system pool `targetPool` (to be distributed by the terms of [Ace Assets][4])


## Pseudocode

```python

def makeSystemServicePayment(sourceAccount, amount, targetPool):
    """
    sourceAccount - the payer account
    amount - amount of payment in XAC
    targetPool - system pool that will receive the payment
    """
    if sourceAccount.balance.xac >= amount:
        # Source account has enough XAC

        # Move `amount` XAC from the source account to the target pool
        sourceAccount.balance.xac -= amount
        targetPool.balance.xac += amount
    else:
        # Source account doesn't have enough XAC

        # Amount of XAC user has
        xacAmount = sourceAccount.balance.xac

        # Amount of XAC needed to complete the payment
        amountLeft = amount - xacAcount

        # Amount of XAB needed based on system DEX exchange rate
        exchangeRate = DEX.getRate('XAC', 'XAB')
        xabAmount = amountLeft * exchangeRate

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xacAmount` XAC from the source account to the target pool
            sourceAccount.balance.xac -= xacAmount
            targetPool.balance.xac += xacAmount

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

                # How many XAB should be replaced with XAC
                xabToReplace = xabAmount - toUnlock

                # Unlock `toUnlock` XAB
                if toUnlock > 0:
                    System.lockedPool.amount -= toUnlock
                    System.unlockedPool.amount += toUnlock

                # emit `xacToEmit` XAC based on system DEX exchage rate
                xacToEmit = xabToReplace / exchangeRate
                targetPool.balance.xac += xacToEmit
        else:
            raise Exception('not enough tokens')

```

## Examples

Examples are available [here][7]


[1]: ../system-tokens/ace-coin.md
[2]: ../system-tokens/ace-byte.md
[3]: ../system-tokens/exchange.md
[4]: ../services/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
