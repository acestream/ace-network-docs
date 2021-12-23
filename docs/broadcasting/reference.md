# Reference

## Data types

The following data types are used in parameters' description:

| Name | Description |
| --- | --- |
| int | Integer |
| string | String |
| enum | String limited to the list of possible values |
| bool | Integer 0 or 1 |
| flag | The flag is set when it's present in the command line |
| path | String with a path to a file or directory. Can be absolute or relative. Relative paths are resolved from the current working directory. |
| list | Parameter can be repeated multiple times to produce a list. |


## Common parameters

These parameters can be applied to both source and support nodes.

| Name | Type | Description |
| --- | --- | --- |
| --log-file | string | path to log file |
| --log-debug | int | Debug level |
| --log-modules | string | Log level config |
| --log-backup-count | int | Max number of backup log files produced during log roration |
| --log-max-size | int | Max log file size in bytes |
| --private-node | bool | Make node private |
| --monitor-node-ip | string | IPv4 address of the monitor node. This parameter is used to allow monitor node to access private node. Example: --monitor-node-ip 192.168.1.150 |
| --upload-to | list | List of IPv4 addresses that this node is allowed to upload to. Example: --upload-to 192.168.1.20:8641 |
| --download-from | list | List of IPv4 addresses that this node is allowed to download from. Example: --download-from 192.168.1.19:8641 |
| --close-connections-from-same-peer | bool | Close previous connection from the same peer. Default: false. |
| --max-connections | int | The maximum number of total TCP and UDP connections. This includes both established and pending connections. Default: 1000. |
| --max-peers | int | The maximum number of established TCP and UDP connections to other nodes. Default: 50. |
| --stats-report-interval | int | Interval in seconds between internal statistics update. Default: 60. |
| --stats-report-peers | flag | Update information about connected peers in the internal statistics (increases CPU load) |
| --service-remote-access | flag | Enable remote access to the node's HTTP interface |
| --service-access-token | string | Set the secret token to access the node's HTTP interface |
| --live-cache-type | enum | "disk" or "memory" |
| --state-dir | path | Path to a directory where node state is saved. |
| --cache-dir | path | Path to a directory where cache is saved. |
| --metadata-dir | path | Path to a directory where metadata is saved. |
| --pid-file-dir | path | Path to a directory where pid file is created. |

## MPEG TS source node parameters

| Name | Type | Description |
| --- | --- | --- |
| --name | string | The stream name. Please use only chars [a-z0-9_-] for the name. Use `--title` to set human readable stream name. |
| --source | string | URL of the source MPEG TS stream |
| --source-read-timeout | int | Source read timeout in seconds |
| --source-reconnect-interval | int | Interval in seconds between automatic reconnects when the source disconnects or the read timeout is exceeded. |
| --bitrate | int | The average bit rate of the stream in bytes per second. 0 for auto-detect. |
| --publish-dir | path | The directory where transport files are created |
| --mutex-name | string | Only Windows. Optional named mutex name. If specified the node tries to create named mutex on start and exits immediately if the mutex already exists. |
| --skip-internal-tracker | flag | Don't start internal tracker |
| --host | string | Network address of the node (used for the internal tracker) |
| --port | int | Port the node works on. Default: 7764 |
| --permanent | flag | mark the broadcast as 24/7 (available all the time) |
| --date-start | string | Set stream start time (for streams that are available only at the specified time) |
| --date-end | string | Set stream end time (for streams that are available only at the specified time) |
| --title | string | human readable title of the stream |
| --quality | enum | Possible values: auto, SD, HD |
| --category | enum | Set the stream category. Possible values [here][1] |
| --tag | list | Stream tags (any strings) |
| --logo-url | string | URL of the stream logo |
| --description | string | Description of the stream |
| --deinterlacing-mode | enum | Set the deinterlacing mode. Possible values: discard, blend, mean, bob, linear, x, yadif, yadif2x, phosphor, ivtc. |
| --allow-public-trackers | bool | Allow nodes to use public trackers when processing this stream |
| --piecesize | int | Piece size in bytes, power of two. If not specified it's set automatically depending on the bit rate. |
| --chunksize | int | Chunk size in bytes, power of two. Default: 16384 |
| --tracker | list | URL of the external tracker |
| --metatracker | list | URL of the metatracker |
| --startup-node | list | Network address of startup node |
| --provider-key | string | Provider (broadcaster) key. It's stored in the transport file and let other nodes know who started this stream. |
| --sid | string | Stream identifier for statistics. TODO: need clarification |
| --timeshift | int | Hint about the time shift length in seconds. Client nodes use this values to display time shift progress bar.  |

## Support node parameters

| Name | Type | Description |
| --- | --- | --- |
| --url | string | URL of the transport file |
| --public-transport-file | string | URL of public transport file (if different from the main one) |
| --bind | list | The address to bind to. Leave empty to bind to all interfaces. |
| --port | int | The port. Default: 8621 |
| --always-generate-peer-id | flag | Always create new peer id when the node is started. Otherwise the node attempts to use previously generated peer id that is saved in state.json file in the state directory. |
| --support-node-cleanup-interval | int | Interval in seconds between support node internal maintenance. Default: 1. |

## HLS support node parameters

These parameters are specific HLS support node

| Name | Type | Description |
| --- | --- | --- |
| --hide-hls-segments | flag | Don't send chunk URLs to any connected nodes. |
| --hls-broadcast-last-source-piece | flag | Broadcast last available piece index to the pool |
| --hls-skip-data | flag | Don't download data chunks. Only download and broadcast HLS manifest. |
| --hls-skip-metadata-broadcast | flag | Don't broadcast chunk URLs - send them only to directly connected nodes |
| --hls-bad-manifest-max-errors | int | Max "bad manifest" errors before stream reset |
| --hls-bad-manifest-retry-interval | int | Interval in seconds before next try after "bad manifest" error |
| --hls-force-monotonic-sequence | bool | Rewrite piece numbers to make a monotonic increasing sequence |

## HLS transport file creation parameters

| Name | Type | Description |
| --- | --- | --- |
| --url | string | HLS playlist URL |
| --base-url | string | Base manifest URL |
| --hide-hls-manifest | flag | Hide HLS manifest URL from clients |
| --output-public | path | Output path for public transport file |
| --output-private | path | Output path for private transport file |
| --title | string | Human readable name of the stream |
| --tracker | list | URL of the tracker |
| --provider-key | string | Provider key |
| --sid | string | Provider stream id |
| --category | enum | Stream category. Possible values [here][1] |
| --country | list | county code ISO-3166 (3 chars) |
| --language | list | language code ISO-639-3 (3 chars) |
| --quiet | flag | Don't print output to stdout |


[1]: /developers/knowledge-base/list-of-categories.md
