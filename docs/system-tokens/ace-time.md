# Ace Time (XAT)

**Ace Time (XAT)** is an algorithmic internal system token backed by the amount of traffic consumed in relation to one hour of content playback. Ace Time tokens can be used to pay for traffic to deliver 1 hour of content within Ace Stream P2P CDN, regardless of the amount of GB used.

AceTime tokens are not in free circulation, but perform an exclusively technical role and serve to optimize mutual settlements when creating tokenized tariff packages with time reference.


## Issuance

There is no initial issuance of XAT.

Ace Time is issued automatically during encapsulation into other time-based tokens.
For example, when encapsulated in tokens of copyright holders within the [Ace Maker][3] protocol.

Ace Time tokens are created by the [AceTimeManager][2] smart contract at the time of encapsulation.
To create one Ace Time token, you need to burn Ace Byte tokens in an amount that corresponds to
the current average level of traffic consumption in the Ace Stream network, when playing 1 hour of content. Algorithm details and examples [here][1]


## Types of Ace Time tokens

Technically, the Ace Time token is represented by a set of several tokens, each of which is tied to a specific type of content. There are currently two types of tokens in use:

- **Ace Time Multimedia** - a token that can be used to pay for traffic to deliver one hour of multimedia content (audio + video)

- **Ace Time Audio** - a token that can be used to pay for traffic to deliver one hour of audio content


[1]: ../traffic-payments/payments.md
[2]: ../list-of-operations/ace-time-manager.md
[3]: https://acemakerdao.com/
