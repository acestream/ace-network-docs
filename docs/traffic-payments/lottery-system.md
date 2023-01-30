# "Lottery" system

The "lottery" system is used in cases where traffic is paid not by users, but by content providers or broadcasters. This is possible in such cases:

- watching content in a personalized premium pool using content provider tokens
- watching paid content in all other cases, provided that the broadcaster has indicated in the billing settings that he will pay for traffic

In such a scheme, the nodes that send traffic do not receive rewards directly (as in normal traffic payments), but through the "lottery" system described in this section. This architecture minimizes the risks of cheating from the giving nodes.


## Algorithm

This system holds a drawing of rewards between users who actively gave traffic:

- those users who provided traffic for as minimum 1 GB can take part in drawing
- for every 1 GB of traffic transferred, the participant receives 1 lot
- once every 28 days a lottery is launched and it is a smart contract [Reward Uploaders][1], which randomly selects winning lots and rewards them
- a number of lots per one user is limited by formula:

    `maxLots = accessPrice / trafficPrice`

    where:

    - `accessPrice` - the content access price in stablecoins
    - `trafficPrice` - the price of 1 Gb of the traffic in stablecoins (the current price is 0.01$ per 1 Gb)

- the winning coefficient is 1: 100:
    - every hundredth lot wins
    - the winning lot receives a reward equivalent to 100 GB of traffic
- the winning coef. can be changed for the owners of the premium pool


## Technical implementation 

Funds for lottery distribution are accumulated in the main blockchain in the reward pool (`uploadersRewardPool`) - this is a field tied to a broadcaster's account, a pool of broadcasters or a subscription. The pool of rewards is replenished by the traffic and time accounting system - at the moment the traffic is paid by the broadcaster or content provider, AceByte tokens are transferred to this pool. The contents of this pool are distributed among the winners at the time the lottery is launched.

The data for generating lots is stored in the reward pool as a list of "userAccount → trafficAmount" pairs (the number of given traffic units for each user).


[1]: ../list-of-operations/reward-uploaders.md
