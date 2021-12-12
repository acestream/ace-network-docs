# Traffic and time accounting

The traffic and time accounting subsystem is an integral and vital part of the Ace Stream stack since traffic and time spent by participants are the core values of the whole network.

Ace Stream stores collected accounting data as a sequence of transactions for each pair of interacting nodes. Every transaction is signed by the participant nodes before it is saved in the local database to be aggregated and registered in the second layer blockchain for further processing. To prevent the deception of accounting data, every transaction is sent to a random set of other nodes [(random gossip)][1].

Data is rolled up in nodes' local databases and aggregated by merging transactions; this significantly offloads the second layer that needs to process fewer transactions than nodes would generate without additional processing. Aggregated data is sent to second layer blockchains (shards) on a regular basis. The time interval is tuned up by the network according to the network load.

Every second layer blockchain (the shard) serves its own set of interacting nodes which send its own accounting data to be registered only to this shard (except random gossip sends to perform cross-checks). Accounting records collected by shards are the basis for periodic charges that are performed in the main blockchain. The network guarantees that all resources consumed by nodes are covered by corresponding payments (token transfers) made in the main blockchain.


[1]: https://github.com/Tribler/tribler/issues/4634