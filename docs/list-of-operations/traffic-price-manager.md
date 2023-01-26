# Traffic Price Manager

The "Traffic Price Manager" is a smart contract responsible for calculations related to traffic price.


## Methods

### getXATPrice

Get the price of 1 Ace Time (XAT) token in Ace Byte tokens (XAB)

### getTrafficPriceXAT

Get the price of 1 Gb of traffic in Ace Time tokens (XAT)


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

