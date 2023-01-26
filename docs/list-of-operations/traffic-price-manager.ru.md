# Traffic Price Manager

Смарт-контракт "Traffic Price Manager" отвечает за расчеты, связанные с ценообразованием трафика.


## Methods

### getXATPrice

Получить цену 1 токена Ace Time (XAT) в токенах Ace Byte (XAB)

### getTrafficPriceXAT

Получить цену 1 Гб трафика в токенах Ace Time (XAT)


## Pseudocode

```python
class TrafficPriceManager:

    def getXATPrice(self):
        """Get the price of 1 Ace Time token in Ace Byte tokens"""
        return RateManager.trafficRate() * SystemSettings.trafficPriceUSD / DEX.rate('XAB', 'USD')

    def getTrafficPriceXAT(self):
        """Get the price of 1 Gb of traffic in Ace Time tokens (XAT)"""
        return 1 / RateManager.trafficRate()

```

