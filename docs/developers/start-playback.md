# Start Playback

## How It Works

In the terms of video stream playback the engine acts as a gateway between P2P network and video player:

- the player "tells" the engine which stream should be played and which output format should be used
- the engine connects to the P2P network, downloads the stream data from other peers and reassembles it to the specified output format (e.g. MPEG TS)
- the player receives the stream from the engine over HTTP

## Input Parameters

Input parameters are divided in two groups:

- what should be played (required)
- extended configuration options (optional)

In this section we'll describe only the first group. You can read about all available options in the [API Reference][1].

To start playback the engine needs to know which broadcast to connect to. The broadcast is uniquely identified by the transport file, but in practice you can start playback without explicitly passing the transport file to the engine. There are four possible options and you must specify one of them:

| Parameter | Description |
| --- | --- |
| content_id | Content ID of the stream |
| infohash | Infohash of the stream |
| url | URL of the transport file |
| magnet | Magnet link |

These parameters are mutually exclusive and are parsed in the same order as in the table above. This means that if you specify both `content_id` and `infohash` parameters only `content_id` will be used.

## Output Format

The engine supports two output formats:

- MPEG TS
- HLS

The format is selected by using the corresponding endpoint.

To receive the stream in MPEG TS:

```
# Endpoint
GET /ace/getstream

# Example
http://127.0.0.1:6878/ace/getstream?infohash=0a4848271c91ce2d8965ce416267c25047dc8141
```

To receive the stream in HLS:

```
# Endpoint
GET /ace/manifest.m3u8

# Example
http://127.0.0.1:6878/ace/manifest.m3u8?infohash=0a4848271c91ce2d8965ce416267c25047dc8141
```

## Using Middleware

We advise using middleware to start playback.

Middleware is a software that acts as a bridge between video player and the engine. If you're a player developer then the middleware most likely will be embedded in the player itself.

In the examples above the engine will output the video stream directly in the response. For example:

```
$ curl -L "http://127.0.0.1:6878/ace/manifest.m3u8?infohash=0a4848271c91ce2d8965ce416267c25047dc8141"
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:7
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:5.720000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/0.ts
#EXTINF:5.360000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/1.ts
#EXTINF:5.600000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/2.ts
#EXTINF:6.280000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/3.ts
#EXTINF:4.160000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/4.ts
#EXTINF:3.720000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/5.ts
#EXTINF:5.800000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/6.ts
#EXTINF:3.920000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/7.ts
#EXTINF:4.600000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/8.ts
#EXTINF:5.600000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/9.ts
#EXTINF:4.600000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/10.ts
#EXTINF:5.640000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/11.ts
#EXTINF:4.800000,
http://127.0.0.1:6878/ace/c/0a4848271c91ce2d8965ce416267c25047dc8141/12.ts
```

It means that the URL that is used to start playback can be passed directly to the player.

The downside of this approach is that you don't have control over the playback session. Using the middleware gives you such control and you can:

- explicitly stop the playback session
- get the info about playback session (number of connected peers, download and upload speed etc)

In the middleware you should add `format=json` parameter. The engine will start the playback session and give you links to control the session:

```
$ curl "http://127.0.0.1:6878/ace/manifest.m3u8?format=json&infohash=0a4848271c91ce2d8965ce416267c25047dc8141"
{
  "response": {
    "playback_url": "http://127.0.0.1:6878/ace/m/0a4848271c91ce2d8965ce416267c25047dc8141/f528764d624db129b32c21fbca0cb8d6.m3u8",
    "stat_url": "http://127.0.0.1:6878/ace/stat/0a4848271c91ce2d8965ce416267c25047dc8141/f528764d624db129b32c21fbca0cb8d6",
    "command_url": "http://127.0.0.1:6878/ace/cmd/0a4848271c91ce2d8965ce416267c25047dc8141/f528764d624db129b32c21fbca0cb8d6",
    "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141",
    "playback_session_id": "e0d10c40465de696c0222ffa815edace0635b86a",
    "is_live": 1,
    "is_encrypted": 0,
    "client_session_id": -1
  },
  "error": null
}
```

The most important fields in the response:

- `playback_url` - the URL of video stream. It should be passed to the player.
- `stat_url` - this URL returns the information about the playback session
- `command_url` - this URL is used to stop the playback session. To do this you should add `method=stop` parameter to this URL. NOTE: you're not required to stop the session. The engine will stop it automatically if the player stops reading the stream. But the good practice is to stop the session explicitly.

Other fields are described in the [API Reference][1].

**Examples**:

```
# stop playback session
$ curl "http://127.0.0.1:6878/ace/cmd/0a4848271c91ce2d8965ce416267c25047dc8141/f528764d624db129b32c21fbca0cb8d6?method=stop"
{
  "response": "ok",
  "error": null
}

# get session info
$ curl "http://127.0.0.1:6878/ace/stat/0a4848271c91ce2d8965ce416267c25047dc8141/f528764d624db129b32c21fbca0cb8d6"
{
  "response": {
    "uploaded": 491520,
    "network_monitor_status": 0,
    "debug_level": 0,
    "disk_cache_stats": {
      "avail": 3199156224,
      "disk_cache_limit": 2266017044,
      "inactive_inuse": 0,
      "active_inuse": 38010982
    },
    "speed_down": 257,
    "speed_up": 29,
    "network_monitor_started": false,
    "selected_stream_index": 0,
    "total_progress": 0,
    "stream_status": -1,
    "client_session_id": -1,
    "status": "dl",
    "downloaded": 3276800,
    "manifest_access_mode": -1,
    "peers": 4,
    "playback_session_id": "15ad634c7ed4deb28045e641c825adcebe5b5f27",
    "is_encrypted": 0,
    "is_live": 1,
    "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141",
    "selected_file_index": -1,
    "livepos": {
      "last": "1639986704",
      "live_first": "1639984904",
      "pos": "1639986704",
      "first_ts": "1639984904",
      "last_ts": "1639986704",
      "is_live": "1",
      "live_last": "1639986704",
      "buffer_pieces": "30"
    }
  },
  "error": null
}
```

**Playback session info fields**


| Name | Type | Description |
| --- | --- | --- |
| status | enum | Playback session status. Values: prefuf, dl. |
| peers | int | Number of connected peers |
| speed_down | int | Download speed (Kbytes/s) |
| speed_up | int | Upload speed (Kbytes/s) |
| downloaded | int | Total downloaded (bytes) |
| uploaded | int | Total uploaded (bytes) |


[1]: api-reference.md
