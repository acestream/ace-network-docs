# Rewarding Uploaders


The system smart contract that implements the ["lottery"][1] mechanism.

An operation can be initiated by any account, but the network will only accept one attempt every 28 days.


## Pseudocode

```python
# Iterate over all non-empty reward pools
for rewardPool in nonEmptyRewardPools:
    # Make lots
    lots = []
    for uploader in rewardPool.uploaders:
        # trafficAmount contains amount of uploaded traffic in megabytes
        # Each uploaded gigabyte equals to one lot
        numberOfLots = floor(uploader.trafficAmount / 1024)
        for i in range(numberOfLots):
            lots.append(uploader.account)

    # Shuffle
    shuffle(lots)

    # win factor is stored in pool settings
    winFactor = SystemSettings.uploaderRewardWinFactor

    # Number of winner is based on the win factor.
    # For example, if win factor if 100, then each 100th lot is a winner.
    numberOfWinners = floor(len(lots) / winFactor)

    # If number of lots is less than win factor then one winner gets all reward
    if numberOfWinners == 0:
        numberOfWinners = 1

    # Select winners
    winners = []
    for i in range(numberOfWinners):
        winners.append(lots[i*winFactor])

    # Reward pool is distributed equally among the winners
    singleReward = rewardPool.amount / len(winners)
    for winner in winners:
        addTokens(winner, singleReward)

    # reset reward pool (empty amount and uploaders)
    rewardPool.reset()
```

## Description

- the smart contract finds all non-empty reward pools
- the following actions are performed for each found reward pool:
    - an array of lots is generated based on the list of candidates (`uploaders`) and the winFactor (`winFactor`)
    - the list of candidates is an array of public keys of nodes, which gave the traffic of the given broadcaster or pool since the previous launch of the `Reward Uploaders` smart contract. For each node, the list stores the number of traffic units given away
    - win ratio is an integer number stored in the system settings. It sets the ratio of the number of winners to the total number of lots
    - each Gbyte of traffic uploaded (1024 Mb) is equal to one lot
    - only candidates who have uploaded >= 1 Gb of traffic participate in the lottery
    - number of lots for one candidate is limited by formula:

        `maxLots = accessPrice / trafficPrice`
        where:

        - `accessPrice` - the content access price in stablecoins
        - `trafficPrice` - the price of 1 Gb of the traffic in stablecoins (it's calculated based on the current AceByte token market price)

    - the number of winners is determined based on the gaining coefficient (at the coefficient N every N-th element of the lots array is a winner)
    - if the number of lots is less than the odds of winning, then one winner is selected
    - the smart contract randomly chooses the necessary number of winners from the array of lots
    - the content of the reward pool is distributed equally among the winning lots
    - after the drawing the reward pool and the list of candidates will be reset to zero


## Example

Suppose there is one reward pool that contains the following data at the time of launching the `Reward Uploaders` smart contract:

- rewards pool: 3 XAB
- list of candidates who gave >= 1 GB of traffic:
    - userA: uploaded 60 GB
    - userB: uploaded 70 GB
    - userC: uploaded 2 GB
    - userD: uploaded 85 GB

Let the win rate be 100, then:

- total number of lots: `60 + 70 + 2 + 85 = 217`
- the number of winning lots: `floor(217 / 2) = 2`.
- winnings per lot: ` 3 / 2 = 1.5 XAB`.

The `Reward Uploaders` smart contract randomly selects 2 of the 217 lots and awards 1.5 XAB to the owners of those lots. If both winning lots belong to the same owner, they receives 3 XAB.




[1]: ../traffic-payments/lottery-system.md
