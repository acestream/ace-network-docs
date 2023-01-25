# Accounts and nodes.


AcAce Network's account is a Stellar account in Ace's first layer blockchain. Accounts sign transactions and keep tokens; accounts are subjects of generating and consuming resources.


Node is the instance of Ace Engine (client software) that has its own key pair and is linked to the specific account. Every account can have any number of linked nodes. Every linking should be performed intentionally by the account owner ([Add a device][2]) and charges the account's wallet for 0.1 XAB (tokens are being moved to [`txFeePool`][3]).

A node can be unlinked from the account by performing [Remove device][4] operation; note the public key of the unlinked node becomes unavailable for linking to another account for 180 days.

[1]: https://developers.stellar.org/docs/glossary/accounts/
[2]: ../list-of-operations/add-device.md
[3]: ../glossary/system-pools.md#txfeepool
[4]: ../list-of-operations/remove-device.md
