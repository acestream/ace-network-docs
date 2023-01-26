# User Service Payment

The "User Service Payment" module is a system smart contract responsible for processing payments related to traffic accounting and content access.

## Payment Algorithm

- if the payer has enough [XAT][1] then only [XAT][1] are used
- if the payer is short of XAT then the difference is paid with [XAB][2]:
    - the required amount of XAB is calculated with the [TrafficPriceManager][3] contract
    - this amount of XAB is being charged from the payer
    - all the charged XAB are burned, the corresponding amount of XAT is automatically created and credited to the payee
    - if the [`lockedPool`][5] is not empty then the same amount of XAB is put into circulation (moved from [`lockedPool`][5] to [`unlockedPool`][6])


## Pseudocode

```python

def makeUserServicePayment(sourceAccount, targetAccount, amount):
    """
    sourceAccount - the payer account
    targetAccount - the payee account
    amount - amount of payment in XAT
    """
    if sourceAccount.balance.xat >= amount:
        # Source account has enough XAT

        # Move `amount` XAT from the source account to the target account
        sourceAccount.balance.xat -= amount
        targetAccount.balance.xat += amount
    else:
        # Source account doesn't have enough XAT

        # Amount of XAT the payer has
        xatAmount = sourceAccount.balance.xat

        # Amount of XAT needed to complete the payment
        xatToEmit = amount - xatAcount

        # Calculate amount of XAB required to mint one XAT
        xatPrice = TrafficPriceManager.getXATPrice()
        xabAmount = xatToEmit * xatPrice

        if sourceAccount.balance.xab >= xabAmount:
            # Move `xatAmount` XAT from the source account to the target account
            sourceAccount.balance.xat -= xatAmount
            targetAccount.balance.xat += xatAmount

            # Burn `xabAmount` XAB from the source account
            sourceAccount.balance.xab -= xabAmount
            System.BLACKHOLE.balance.xab += xabAmount

            # Emit `xatToEmit` XAT and add them to the target account
            targetAccount.balance.xat += xatToEmit

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


[1]: ../system-tokens/ace-time.md
[2]: ../system-tokens/ace-byte.md
[3]: ../list-of-operations/traffic-price-manager.md
[4]: ../system-tokens/ace-asset.md
[5]: ../glossary/system-pools.md#lockedpool
[6]: ../glossary/system-pools.md#unlockedpool
[7]: ../system-tokens/examples.md
