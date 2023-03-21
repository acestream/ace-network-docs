# Oracles

The Oracle is a special account with extended permissions. Technically, permissions are implemented at the level of access to operations - there are a number of operations that only oracles can perform. The specific list of operations depends on the type of oracle. For example, only a "rights holder oracle" may submit an operation to bind a content identifier to a rights holder.

Each oracle is represented by a separate business entity that can play such a role (for example a law firm), the valid URL of the website of such entity is mandatory and stores in the 'home domain' field of its account.


## Adding and removing oracles

Adding and removing oracles is done solely by [vote][1] of the [AST][2] holders.

The list of oracles is stored in the system settings.


## Oracle Types

### Right Holders Oracle

This oracle has the authority to bind the content identifier to the copyright holder (method `bind` of [`Copyrights Manager`][3] contract).


[1]: ../glossary/system-settings.md#_3
[2]: ../system-tokens/ace-stream-token.md
[3]: ../list-of-operations/copyrights-manager.md
