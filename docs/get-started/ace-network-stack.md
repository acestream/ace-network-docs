# Ace Network Stack


Ace Network is being built with neither the need to re-invent the wheel nor introducing completely new technologies like yet-another-blockchain or yet-another-consensus-algorithm. Our goal is a safe and robust network that would satisfy all needs of Ace Stream DAO, which is perfectly feasible by combining the technologies listed below.


## Ace Stream

Backbone technology for the whole network, P2P communication layer optimised for low latency and high throughput streaming.

## Stellar

Well-known distributed ledger implementation used in Ace Network to store and transfer crypto-assets (reasons why Stellar fits Ace Stream's needs the best, and other technical details are available in [Network Architecture])


## Tribler

The veteran project of the P2P area had absorbed plenty of nuances associated with implementation and using P2P software. Ace Stream utilizes some of Tribler’s great features like:

* P2P overlay network (Tribler’s IPv8)
* distributed database
* distributed traffic accounting
* detecting malicious actions and actors (fake data, double-spending attempts, etc.)
