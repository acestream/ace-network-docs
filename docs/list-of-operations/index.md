# The list of operations


The [operations][1] described here are specific to the Ace Network, they are additional to and extend Stellar's list of [standard operations][2].

There are three kinds of operations: system smart contracts, standard operations and oracle's operations.

Standard operations can be executed by any account.

Oracle's operations can be executed only by oracles (it's a special account type).

System smart contracts could:

-  be intiated on the network by any account, but not more frequently than a specified interval
-  affect some subset of accounts without requiring the signature of each affected account


## System smart contracts

- [Ace Asset](ace-asset.md)
- [Distribute Subscriptions](distribute-subscriptions.md)
- [Purge Devices](purge-devices.md)
- [Purge Subscriptions](purge-subscriptions.md)
- [Reward Uploaders](reward-uploaders.md)
- [AceByte Manager](ace-byte-manager.md)
- [AceTime Manager](ace-time-manager.md)

## Standard Operations

- [Add Device](add-device.md)
- [Buy Single Access](buy-single-access.md)
- [Buy Subscription](buy-subscription.md)
- [Remove Device](remove-device.md)

## Oracle's Operations

- [Add Rights Holder](add-rights-holder.md)

[1]: ../glossary/operations.md
[2]: https://developers.stellar.org/docs/start/list-of-operations/
