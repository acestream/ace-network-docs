# Get Started

## Supported Systems

Ace Stream Engine is available for Linux, Windows and Android, but the most of examples in the docs will refer to the Linux.

## Start MPEG TS broadcast

Prerequisites:

- Linux machine with installed Ace Stream Engine
- MPEG TS stream accessible from that machine (for example, at address `http://192.168.1.100/stream`)

Running the node:

```bash
start-engine --stream-source-node \
    --source "http://192.168.1.100/stream" \
    --name "test" \
    --title "Test Stream" \
    --bitrate 0 \
    --quality "SD" \
    --category "entertaining"
```

After successful start you will see an output like this:

```
2021-12-03 11:03:08,162|MainThread|acestream|enable debug: 0
2021-12-03 11:03:08,183|MainThread|acestream.InfiniteHTTPStream|open stream: url=http://192.168.1.100/stream reader=builtin
2021-12-03 11:03:08,629|MainThread|acestream.InfiniteHTTPStream|open stream done: url=http://192.168.1.100/stream time=0.44584107399
2021-12-03 11:03:08,669|MainThread|acestream.SocketHandler.InterruptSocket|bound on 127.0.0.1:52010
2021-12-03 11:03:08,670|MainThread|acestream.SocketHandler.SocketHandler|bind: socket bound: host=0.0.0.0 port=7764
2021-12-03 11:03:08,670|MainThread|acestream.LM|listen on 7764
2021-12-03 11:03:08,732|MainThread|acestream.streamer|init: start bitrate detection
2021-12-03 11:03:09,739|MainThread|acestream.InfiniteHTTPStream|stream status changed: -1->1
2021-12-03 11:04:08,821|MainThread|acestream.InfiniteHTTPStream|detect_bitrate: done: bitrate=295972.974873 bytes=17784832 time=60.0893781185
............................+++++++
....................+++++++
2021-12-03 11:04:08,887|MainThread|acestream.streamer|private node: 0
2021-12-03 11:04:08,889|MainThread|acestream.streamer|trackers: ['http://192.168.1.165:7764/announce']
2021-12-03 11:04:08,890|MainThread|acestream.streamer|metatrackers: []
2021-12-03 11:04:08,890|MainThread|acestream.streamer|bitrate: 295972
2021-12-03 11:04:08,890|MainThread|acestream.streamer|piece size: 262144
2021-12-03 11:04:08,890|MainThread|acestream.streamer|chunk size: 16384
2021-12-03 11:04:08,891|MainThread|acestream.streamer|publish dir: .
2021-12-03 11:04:08,891|MainThread|acestream.streamer|cache dir: .
2021-12-03 11:04:08,900|VideoSourceThread-19|acestream.videosource|started input thread
```

To stop broadcasting press `Ctrl-C`

The node will create the following files and directories:

- temporary directory with the name like "tmpo1XkjV" in the /tmp directory (unless `--state-dir` option is used)
- PID file with the name like "acestream-7764.pid" (7764 is the port the node runs on) in `--pid-file-dir` (default: /tmp). PID file contains the node's process id. This file is deleted when node stops.
- Transport file like "test.acelive" in `--publish-dir` (default: current directory). The filename ("test") is set by `--name` option
- Metadata files in `-metadata-dir` (filenames are set by `--name` option):
    - test.restart (file with the last piece number)
    - test.sauth (file with a keypair used to sign the stream)
- One or more cache files in `--cache-dir` (if the cache is stored on the disk):
    - live.f7ae6fb6d66ca6833c312151e01e6293b0c8b8f3.0 (f7ae6fb6d66ca6833c312151e01e6293b0c8b8f3 is the stream infohash)

## Start HLS Broadcast

Prerequisites:

- Linux machine with installed Ace Stream Engine
- HLS stream accessible from that machine (for example, at address `http://192.168.1.100/stream/index.m3u8`)

Create the transport file:

```bash
start-engine --create-hls-transport \
    --url "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8" \
    --title "Test Stream 2" \
    --output-public "test.acelive"
```

This command will create the transport file with name "test.acelive" in the current directory.

Running the node:

```bash
start-engine --stream-support-node --url "test.acelive"
```

After successful start you will see an output like this:

```
2021-12-06 17:44:06,361|MainThread|acestream|enable debug: 0
2021-12-06 17:44:06,406|MainThread|acestream.SocketHandler.InterruptSocket|bound on 127.0.0.1:43854
2021-12-06 17:44:06,406|MainThread|acestream.SocketHandler.SocketHandler|bind: socket bound: host=0.0.0.0 port=8621
2021-12-06 17:44:06,406|MainThread|acestream.LM|listen on 8621
2021-12-06 17:44:06,432|MainThread|acestream.supportnode|state dir: /tmp/tmp4irxvJ
```

## Source and support nodes

There are two main node types used for broadcasting:

- source node
- support node

These nodes operate differently from client nodes - regular users of Ace Stream network.

MPEG TS stream must have exactly one source node.

Public HLS stream doesn't require any nodes at all (but support nodes may be used optionally).

Private HLS stream requires at least one support node.

The difference between public and private HLS streams is described [here][1].

Support nodes are optional. The purpose of support node is to make the stream more stable. Actually a support node is like a client node that is always online and has good upload speed. Each stream can have unlimited number of support nodes.

## Private and public nodes

Public nodes are accessible by any other node.

Private nodes are accessible only from explicitly configured addresses. All other network connections are dropped immediately.

Configuration details are [here][2].

## Trackers

The tracker is a server that helps nodes to find each other.

Ace Stream is fully compatible with BitTorrent trackers.

Nodes can find each others without trackers as well (for example, by using DHT), but with trackers it often happens much quicker.

In a simple scenario you don't need a tracker to start broadcasting - the source node already has builtin tracker (we call it "internal" tracker). But we don't recommend using internal tracker in production environments. First, it has relatively poor performance. Second, most likely you will have a private source node in production, so internal tracker won't be accessible. In such case we recommend to setup external trackers using specialized software like [XBT][3]


[1]: details/hls.md
[2]: administration/public-private-nodes.md
[3]: https://github.com/OlafvdSpek/xbt
