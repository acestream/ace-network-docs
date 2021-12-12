# Performance considerations

## Downstream Performance

Nodes consume the data stored in the main blockchain to create valid, up-to-date profiles of their peers. To prevent spikes of queries, shards (the second layer) keep caches of data from the first layer, guaranteeing horizontal scalability of reads.

## Upstream performance

### Main blockchain

Since the first layer is a fork of Stellar, it guarantees to perform at least 1000 transactions per second in the worst case [(usually more)][1].

The second layer tends to clear and consolidate accounting info to that extent when only one transaction per account per day is required to be stored in the main blockchain, so Ace Network could serve approximately 172,800,000 active accounts daily.


### Shards (the second layer)

Every shard is also a separate Stellar blockchain with the same performance (1000 transactions per second). Sharding policies still need to be defined after several test runs of the main network.


### The third layer (peers)

There are no specific performance requirements or limitations for the third layer since nodes store mainly their own transactions, so even explosive growth of accounts' activity would not lead to an increase in the load on separate nodes. At the same time, nodes carry most of the load, and having basic accounting functionality on every node dilutes that burden and allows for deferred transaction processing on upper levels.


[1]: https://www.lumenauts.com/blog/how-many-transactions-per-second-can-stellar-process