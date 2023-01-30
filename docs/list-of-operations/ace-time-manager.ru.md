# AceTime Manager

Смарт-контракт "AceTime Manager" отвечает за эмиссию и утилизацию токенов AceTime


## Методы

### convert

Подсчитать количество токенов AceByte, необходимых для создания указанного количества токенов AceTime определенного типа (например, мультимедиа либо аудио)

### mint

Эмитировать токены AceTime и сжечь соответствующее количество токенов AceByte (количество сжигаемых токенов зависит от текущего уровня потребления трафика определенного типа)

### burn

Сжечь токены AceTime и эмитировать соответствующее количество токенов AceByte (количество эмитируемых токенов зависит от текущего уровня потребления трафика определенного типа)


## Псевдокод

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

