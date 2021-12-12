# Traffic Price

The price of traffic in the system is expressed in XAC and is automatically adjusted based on the level of traffic consumption.

Level of traffic consumption (`trafficRate`) it is the ratio of the amount of consumed video traffic to the time spent on viewing video content within the entire Network for the whole time of its operation.


## Algorithm for calculating the price

Initially, the system code contains the following constants:

```python
# Initial traffic price: 0.01 XAC per 1 Gb
initialTrafficPrice = 0.01

# Initial rate: 1 Gb per 1 hour expressed in bytes per second
initialTrafficRate = 298261 # bytes/s
```

The traffic price is calculated based on these constants and the current traffic rate:

```python
trafficPrice = initialTrafficPrice * initialTrafficRate / currentTrafficRate
```

Current level of traffic consumption (`currentTrafficRate`) is public information which is stored at the second blockchain level. 
Its value is updated by second-level validators during the processing of traffic exchange transactions.
The calculations take into account only the traffic used to view video content using the Ace Stream protocol.

The initial price is set by Ace Stream based on its own understanding and assessment of the market and determination of a competitive price for Internet traffic. After the launch of the Network no one will be able to influence the further formation of the price and the price will depend only on automatic calculation of the cost algorithms incorporated in the system and the real market.


## Example

If the current level of traffic consumption is 600,000 bytes/s, then 1 GB traffic will cost approximately 0.005 XAC. Calculation formula:

```python
# approx. 0.005 XAC per 1 Gb
trafficPrice = 0.01 * 298261 / 600000 ~= 0.005
```
