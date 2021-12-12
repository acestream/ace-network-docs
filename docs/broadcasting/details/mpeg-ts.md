# MPEG TS

## Pieces and chunks

Piece is the main unit of data transfer in Ace Stream P2P protocol. The original stream is split into pieces of by the source node and that pieces are then transferred between nodes.

Each piece in turn is split into chunks to be transferred over the network.

Piece size can be set by `--piecesize` option, but most of the time it's better to let the node set it automatically. If the piece size is not specified the source node sets it based on the bit rate.

The default chunk size is 16384 bytes and there is no reason to change it.

## How transport files are created

The transport file is always created when the source node starts.

The file is saved in the `--publish-dir` directory (current directory by default).

The file name is `<name>.acelive` where `<name>` is set by `--name` option.

## Bit rate

### Why it's needed

To start broadcasting you need to specify bit rate in bytes/s with `--bitrate` option.

This value is stored in a transport file and acts as a hint for the nodes to adjust some internal buffers. You should use the average bit rate of  the stream, but even if you set wrong bit rate the stream will work.

### Auto detection

Bit rate can be auto detected by the source node: start node with `--bitrate 0` option.

Please note that with this option the node start time increases by 60 seconds because the node spends 1 minute to detect the bit rate.