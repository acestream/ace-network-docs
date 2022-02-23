# Add Rights Holder

Bind the specified content to the rights holder.

This operation can be executed only be the oracle (account with type `RIGHTS_ORACLE`)

Threshold: medium

## Parameters

- `rightsHolder` - AccountID of the rights holder
- `contentID` - content id

This operation creates mapping between the content ID and the rights holder.
This mapping is saved in the blockchain and is used in other operations (e.g. to
credit the rights holder with fees from content access payments).
