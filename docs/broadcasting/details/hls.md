# HLS

## Why only support nodes are used

The main difference between broadcasting MPEG TS and HLS streams is that HLS stream doesn't require the source node because it's already split into the pieces. Actually HLS stream can be broadcasted with Ace Stream even without a support node. This is called "a hybrid broadcast".

## Pieces and chunks

When HLS stream is broadcasted each piece in the original manifest (aka "HLS playlist") becomes a piece in the terms of P2P data exchange. Pieces are split into smaller chunks to be transferred over the network.

## How transport files are created

Transport file for the HLS stream is created by engine with `--create-hls-transport` option.

There are two steps to start a broadcast:

- create transport file
- (optionally) run the support node

## Public and private HLS broadcasts

### Public (hybrid) broadcast

Public HLS broadcast (also called "hybrid broadcast") is a broadcast where all client nodes have an access to the original stream manifest. The manifest URL is included in the transport file.

Example of creating transport file for a public broadcast:

```bash
start-engine --create-hls-transport \
    --url "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8" \
    --title "Test HLS Stream" \
    --output-public "test.acelive"
```

This command creates `test.acelive` transport file. All you need is to publish
this transport file to clients. The public broadcast will work even without
support nodes - clients get the data from the original HLS source and exchange
data between themselves.

Moreover, client nodes can start playback without transport file by using the manifest URL.
Such clients will also connect to the hybrid broadcast and will exchange data with other clients offloading the traffic usage from the original stream source. The only mandatory condition: all the clients must use the same manifest URL (in the terms of binary comparison).

### Private broadcast

Private HLS broadcast is a broadcast where clients don't have an access to the original stream manifest. The data exchange is performed in the P2P pool only. The manifest URL is not included in the transport file.

Example of creating transport file for a private broadcast:

```bash
start-engine --create-hls-transport \
    --url "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8" \
    --title "Test HLS Stream" \
    --hide-hls-manifest \
    --hide-hls-segments \
    --output-public "test.acelive" \
    --output-private "test_private.acelive"
```

The option `--hide-hls-manifest` tells engine that we want to create transport files for the private broadcast (the public transport file will not contain the manifest URL).

The option `--hide-hls-segments` tells engine to hide URLs of the pieces when transmitting data over P2P network.

This command creates two transport files:

- public `test.acelive`
- private `test_private.acelive`

The public transport file should be published to clients. It doesn't contain manifest URL.

The private transport file is used to start support nodes. It contains manifest URL and should not be published to clients.

When you start private broadcast at least one support node is required. A good practice is to start one private support node and two or more public support nodes. The private node will get the stream from the original source and convert it to P2P stream. Public nodes will get the stream from the private node (over P2P) and will upload the data to the outside world.

## Monotonic Sequence

By default engine uses piece numbers from the original HLS stream when converting to P2P stream. Piece numbers are called "media sequence" in the terms of HLS. This approach can cause problems when original stream is reset and piece numbers are started from the beginning. If this happens there can be two different pieces with the same numbers in the pool. This can confuse clients and cause artifacts in the video stream.

To avoid such issues you can start support node with the option `--hls-force-monotonic-sequence`. This will force engine generating always increasing (monotonic) numbers for the pieces in P2P stream, even if the original stream is reset.

NOTE: this option can be used for a private HLS broadcast only (when only one node is responsible for creating P2P stream).

<!--
## Broadcasting piece URLs to the pool

TBD
-->

<!--
## Stream reset

"Bad manifest" error - current media sequence is lower than previous one.

When the node encounters "bad manifest" error several times in a row a stream reset is done - the nodes resets HLS stream metadata and starts from the new media sequence.
-->

<!--
## Using Base URL

- base URL is used when need to create transport files with the same infohash but with different manifest URLs (for example, when the manifest URL contains some nonce that changes over the time)
-->
