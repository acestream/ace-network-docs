# Payment for Traffic

Traffic can be paid with tokens [Ace Byte][5] and [Ace Time][6].

Payment for traffic is carried out automatically from [account for payment for services][1]
within the work of the system [traffic and time accounting][2]

Payment for traffic with AceByte tokens is based on the ratio of 1 AceByte = 100 GB of traffic.

Payment for traffic with AceTime tokens is possible only if
third-party tokens are used that encapsulate the AceTime token (for example, tokens of
copyrights holders in the [Ace Maker][8] protocol). This is due to the fact that AceTime tokens are not in free circulation, but perform an exclusively technical role and serve to optimize mutual settlements when creating tokenized tariff plans with time reference. AceTime tokens are created at the moment of encapsulation into third-party tokens and burned at the moment of their disposal. When burning AceTime tokens, AceByte tokens are automatically issued in an amount that allows you to pay for traffic corresponding to one hour of content playback (based on the amount of traffic consumption equal to the current average level of traffic consumption in the Ace Stream Network, when playing 1 hour of content of one type or another). Depending on the type of content (for example, video or audio), the corresponding types of AceTime tokens (AceTimeMultimedia, AceTimeAudio) are used.

The network takes a fee of 10% from each payment for traffic.
The fee is paid by the payee.
Fee is transferred to the system pool [`trafficFeePool`][4]

An example is available [here][7]


[1]: ../glossary/special-accounts.md#_2
[2]: ../get-started/traffic-time-accounting.md
[4]: ../glossary/system-pools.md#trafficfeepool
[5]: ../system-tokens/ace-time.md
[6]: ../system-tokens/ace-byte.md
[7]: ../system-tokens/examples.md
[8]: https://acemakerdao.com/
