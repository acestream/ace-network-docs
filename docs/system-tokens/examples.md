# Examples

This section provides examples of using Ace Times ([XAT][1]) and Ace
Tokens ([XAB][2]) to pay for Network services and mutual settlement for traffic.

Examples give an idea of how automatic creation of Ace Times and burning of Ace
Tokens works.

All the operations described in the examples are handled by system smart contracts
[System Service Payment][3] and [User Service Payment][4].


## Payment for Traffic

Suppose that account A pays account B for consumed traffic.
Let's take these inputs as an example:

- account A: traffic consumer
- account B: traffic producer
- cost of traffic: 10 XAT
- network fee: 10%
- exchange rate on the system's DEX is 1 XAT for 2 XAB


### Example 1: payment with XAT

Inputs:

- account A has 10 XAT

In this scenario account A has enough XAT to pay for traffic. New XAT are not created:

- 10 XAT are being charged from account А
- the network fee (1 XAT) credits to the system pool `trafficFeePool` (to be distributed by the terms of Ace Assets program)
- account B gets 9 XAT


### Example 2: payment with XAB

Inputs:

- account A has 20 XAB

In this scenario account A has no XAT so only XAB are used for payment. 20 XAB are burned and 9 XAT are automatically generated during this payment:

- 20 XAB are being charged from account А (the equivalent of 10 XAT accordingly to the current exchange rate)
- the network fee (2 XAB) is burned, and then:
    - if there are 2 XAB locked in the network then they are put into circulation (unlocked and distributed by the terms of Ace Assets program)
    - if there are no locked XAB then 1 XAT is automatically created (the equivalent of 2 XAB accordingly to the current exchange rate) and credited to the system pool `trafficFeePool` (to be distributed by the terms of Ace Assets
- payment to account B:
    - 18 XAB are burned, 9 XAT are automatically created and credited to the account B
    - if there are 18 XAB locked in the network then they are put into circulation (unlocked and distributed by the terms of Ace Assets program)


### Example 3: payment with XAT+XAB

Inputs:

- account A has 2 XAT and 16 XAB

In this scenario account A has not enough XAT so XAB are used to pay the difference. 16 XAB are burned and 7 XAT are automatically generated during this payment:

- 2 XAT and 16 XAB (the equivalent of 8 XAT accordingly to the current exchange rate) are being charged from account А
- the network fee (2 XAB) is burned, and then:
    - if there are 2 XAB locked in the network then they are put into circulation (unlocked and distributed by the terms of Ace Assets program)
    - if there are no locked XAB then 1 XAT is automatically created (the equivalent of 2 XAB accordingly to the current exchange rate) and credited to the system pool `trafficFeePool` (to be distributed by the terms of Ace Assets
- payment to account B:
    - 2 XAT are credited to account B from account A
    - 14 XAB are burned, 7 XAT are automatically created and credited to the account B
    - if there are 14 XAB locked in the network then they are put into circulation (unlocked and distributed by the terms of Ace Assets program)



[1]: ace-time.md
[2]: ace-byte.md
[3]: ../list-of-operations/system-service-payment.md
[4]: ../list-of-operations/user-service-payment.md
