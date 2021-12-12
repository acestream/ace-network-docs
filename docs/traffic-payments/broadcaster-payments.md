# Traffic broadcaster payments

==TODO: english version==

If the option to pay for traffic by broadcasters is enabled in the [premium pool][1], then all traffic within this pool is paid from the [account for paying for services][3] of broadcaster.

Funds from traffic payments are distributed as follows:

- 30% system commission (distributed within the program [Ace Asset][4])
- 70% are distributed among the peers which provide traffic

In this scheme, the peers that give traffic receive a reward not directly (as in the usual calculations for traffic), but according to the "lottery" system described in this section. This architecture minimises the risks of cheating on the part of the providing peers.

## "Lottery" system

This system holds a drawing of rewards between users who actively gave traffic:

- those users who provided traffic for as minimum 1 GB can take part in drawing
- for every 1 GB of traffic transferred, the participant receives 1 lot
- once every 28 days a lottery is launched and it is a smart contract [Reward Uploaders][2], which randomly selects winning lots and rewards them
- a number of lots per one user is unlimited 
- the winning coefficient is 1: 100:
    - every hundredth lot wins
    - the winning lot receives a reward equivalent to 100 GB of traffic
- the winning coef. can be changed for the owners of the premium pool


## Technical implementation 

Funds for lottery distribution are accumulated in the main blockchain in the reward pool (`uploadersRewardPool`) and this is a field binded to the broadcaster's account and only system smart contracts can have access to it. This pool is refilled by a traffic and time accounting system and at the moment the broadcaster pays for traffic, tokens are transferred from the account to pay for traffic to the lottery pool. The contents of this pool are distributed among the winners at the time the lottery is launched.

The data for the formation of lots is stored in the main blockchain as a list of pairs "userAccount → trafficAmount" (the number of given traffic units for each user).
The list is a field in the broadcaster account (`uploaders`).
The list is updated by the traffic and time accounting system.

[1]: ../services/premium-pool.md
[2]: ../list-of-operations/reward-uploaders.md
[3]: ../glossary/special-accounts.md#_2
[4]: ../services/ace-asset.md
