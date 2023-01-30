# AceByte Manager

The "AceByte Manager" is a smart contract responsible for minting AceByte tokens.


## Methods

### mint

Mint AceByte tokens in exchange to stablecoins.


## Pseudocode

```python
class AceByteManager:

    def mint(self, account, amount, token):
        # get current price of 1 XAB expressed in `token` tokens
        price = AceStreamDAO.getCurrentXABPrice(token)
        # move `price` tokens from `account` to AceStreamDAO
        token.move(account, AceStreamDAO, price)
        # Mint `amount` Ace Byte tokens
        account.xab += amount

```

