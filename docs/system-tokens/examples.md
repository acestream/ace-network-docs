# Examples

This section provides examples of using Ace Time ([XAT][1]) and Ace
Byte ([XAB][2]) tokens to pay for the traffic.


## Payment for Traffic

Suppose that account A pays account B for consumed traffic.
Let's take these inputs as an example:

- account A: consumed 300 Gb of multimedia (video+audio) traffic by watching 100 hours of the content
- account B: gave 300 Gb of traffic to the account A
- cost of traffic: 3 XAB (because 1 XAB = 100 Gb of traffic)
- network fee: 10%
- current average consumption rate for multimedia traffic: 3 Gb per hour


### Example 1: payment with AceByte tokens

In case of payment with AceByte tokens, the required amount is withdrawn from account A and
transferred to account B minus system commission:

- 3 XAB are being charged from account А
- the network fee (10% = 0.3 XAB) is distributed by the terms of Ace Assets program
- account B gets 2.7 XAB


### Example 2: payment with AceTime tokens

Payment for traffic with AceTime tokens is possible only if
third-party tokens are used that encapsulate the AceTime token (for example, tokens
of copyrights holders in the Ace Maker protocol).

At the moment of using the copyright holder token, the AceTime token is released from it,
then burned and converted into 0.03 AceByte (this is the amount of AceByte required
to pay for 3 GB of traffic - the amount of traffic per hour of viewing at the current average
consumption rate of 3 GB/hour).

So, consider the option when account A used 100 copyright holder tokens
to access the content and accordingly 100 AceTimeMultimedia were released to pay for the traffic:

- 100 AceTimeMultimedia are burned and 3 XAB are minted by contract [AceTimeManager][3]
- the network fee (10% = 0.3 XAB) is distributed by the terms of Ace Assets program
- account B gets 2.7 XAB



[1]: ace-time.md
[2]: ace-byte.md
[3]: ../list-of-operations/ace-time-manager.md
