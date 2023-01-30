# AceByte Manager

Контракт "AceByte Manager" отвечает за эмиссию токенов AceByte


## Методы

### mint

Выпустить токены AceByte в обмен на стейблкоины.


## Псевдокод

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

