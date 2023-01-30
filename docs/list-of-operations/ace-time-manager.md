# AceTime Manager

The "AceTime Manager" is a smart contract responsible for minting and burning AceTime tokens.


## Methods

### convert

Calculate amount of AceByte tokens required to mint the specified amount of AceTime tokens of the given type (e.g. multimedia or audio)

### mint

Mint AceTime tokens and burn the corresponding amount of AceByte tokens (depends
on the current traffic consuption level).

### burn

Burn AceTime tokens and mint the corresponding amount of AceByte tokens (depends
on the current traffic consuption level).


## Pseudocode

```python
class AceTimeManager:

    def convert(self, trafficType, amount):
        """Calculate amount of AceByte tokens required to mint one AceTime token
        of the specified type (e.g. multimedia or audio)"""
        return amount * RateManager.trafficRate(trafficType) / 100

    def mint(self, account, trafficType, amount):
        # Burn AceByte
        account.xab -= self.convert(trafficType, amount)
        # Mint AceTime
        account.xat += amount

    def burn(self, account, trafficType, amount):
        # Burn AceTime
        account.xat -= amount
        # Mint AceByte
        account.xab += self.convert(trafficType, amount)

```

