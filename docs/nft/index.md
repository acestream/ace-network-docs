# NFT

A [non-fungible token][1]{target=_blank} (NFT) is a unique and non-interchangeable unit of data
stored on a blockchain.

Ace Network has full support of NFT.


## Creating NFT

There are several approaches to issuing NFT on Stellar (and thus on Ace Network).

Here we describe an approach when NFT is represented by an [asset][2]{target=_blank}.


1. Create two new accounts (issuer and distributor of NFT)

2. Create a trustline between the distributor and the issuer.
   At this step you need to choose the name of NFT asset, for example "MyNFT"

3. Issue 1 token (0.0000001 MyNFT) by sending it from the issuer to the distributor (0.0000001 is the smallest indivisible unit on Ace Network).

4. Link the issuer account with the content that is represented by NFT.
   There is no standard on this, so let do this by creating data entry with name "nftsource" and URI of the content (e.g. image) in the IPFS as value.

5. Lock the issuer account to ensure that no more NFT tokens can be created.

The reference implementation can be found [here][3]{target=_blank}

[1]: https://en.wikipedia.org/wiki/Non-fungible_token
[2]: https://developers.stellar.org/docs/issuing-assets/anatomy-of-an-asset/
[3]: https://github.com/litemint/litemint/blob/7b447686e3b57c1328322ed33bce377edd42f493/js/core/network.js#L427