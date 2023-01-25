# Payment for Traffic

Traffic can be paid with system tokens [XAT][5] and [XAB][6].

Payment for traffic is carried out automatically from [account for payment for services][1]
within the work of the system [traffic and time accounting][2]

The network takes a fee of 10% from each payment for traffic.
The fee is paid by the payee.
Fee is transferred to the system pool [`trafficFeePool`][4]

The payment is handled with system smart contracts [System Service Payment][7]
and [User Service Payment][8].

An example is available [here][9]


[1]: ../glossary/special-accounts.md#_2
[2]: ../get-started/traffic-time-accounting.md
[4]: ../glossary/system-pools.md#trafficfeepool
[5]: ../system-tokens/ace-time.md
[6]: ../system-tokens/ace-byte.md
[7]: ../list-of-operations/system-service-payment.md
[8]: ../list-of-operations/user-service-payment.md
[9]: ../system-tokens/examples.md
