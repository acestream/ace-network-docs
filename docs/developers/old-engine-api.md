# Old Engine API

!!! warning "This API is deprecated and will be removed in future versions"

## General form of commands

Each command must consist of a string terminated by a separator \r\n

Most of commands have such form:

**CMD [param1] [param2] ...**

where

**CMD** - predefined command name

**param1, param2 ...** - command's parameters, separated by a space

## Commands' types

All commands are divided into incoming and outgoing.

Incoming commands are sent from a client to TS Engine. Client is
any software that uses TS Engine functions. Using incoming commands the
client controls TS Engine.

Outgoing commends are sent from TS Engine to the client. This
type of commands is used to inform the client about work of TS Engine.

## Synchronous commands

Most of incoming commands are performed asynchronously, ie. for these commands there is no such thing as "response to command".

**Examples of asynchronous commands:**

- client sends LOADASYNC, after loading content TS Engine sends LOADRESP after a while
- client sends START, after the end of pre-buffering TS Engine sends PLAY

But there are also commands that are performed synchronously, in
"request-response" mode. At the moment, there are two such commands: **LOAD** and **GETPID**.

Synchronous command assumes the response, sent from TS Engine to the client as a string, starting with ##.

Processing of synchronous commands from client's side should look like this:

- client sends a command (for example, "GETPID qwerty 0 0 0") and waits for response from TS Engine
- if a message starting with `##` is received from TS Engine, this
message is considered as response to synchronous command (for example, `##12345`)

## Incoming commands

**HELLOBG**

Used as a part of "handshake" procedure between client and TS Engine.

This command must be sent by client right after establishing tcp-connection with TS Engine.

Connection with TS Engine is successful, if client receives from TS Engine response to "handshake" - command HELLOTS

**READY**

Informs TS Engine that client is ready to receive outgoing commands

**LOAD TORRENT** <torrent_url> <developer_id> <affiliate_id> <zone_id>

**LOAD INFOHASH** <torrent_infohash> <developer_id> <affiliate_id> <zone_id>

**LOAD PID** <player_id>

**LOAD RAW** <torrent_data> <developer_id> <affiliate_id> <zone_id>

**LOADASYNC** <request_id> **TORRENT** <torrent_url> <developer_id> <affiliate_id> <zone_id>

**LOADASYNC** <request_id> **INFOHASH** <torrent_infohash> <developer_id> <affiliate_id> <zone_id>

**LOADASYNC** <request_id> **PID** <player_id>

**LOADASYNC** <request_id> **RAW** <torrent_data> <developer_id> <affiliate_id> <zone_id>

These commands perform loading torrent-file's content. They are
used to allow client to get a list of files' names in file of interest.
LOAD commands are performed synchronously, LOADASYNC commands -
asynchronously (response comes in outgoing command LOADRESP).

Preferred method is asynchronous loading.

**Parameters:**

**request_id** - random integer - identifier of
LOADASYNC request; this identifier will be sent to client in LOADRESP
command after a list of files will be received; this id serves to ensure
 that client in case of sending multiple LOAD requests knew exactly
which of these requests is answered

**torrent_url** - link to torrent file (for example, http://sometracker.com/torrent/12345)

**torrent_infohash** - torrent's infohash

**player_id** - player's code

**torrent_data** - torrent-file's content, encoded in base64

**developer_id** - developer's code (if unknown, 0 must be sent)

**affiliate_id** - partner's code (if unknown, 0 must be sent)

**zone_id** - code of partner's zone (if unknown, 0 must be sent)

**START TORRENT** <torrent_url> <file_indexes> <developer_id> <affiliate_id> <zone_id>

**START INFOHASH** <torrent_infohash> <file_indexes> <developer_id> <affiliate_id> <zone_id>

**START PID** <player_id> <file_indexes>

**START RAW** <torrent_data> <file_indexes> <developer_id> <affiliate_id> <zone_id>

**START URL** <direct_url> <file_indexes> <developer_id> <affiliate_id> <zone_id>)

These commands are used to start loading a specific file from torrent or by direct link (START URL)

**Parameters:**

**file_indexes** - a list of file's indexes from
torrent file, which have to be loaded. Client receives file's indexes in
 a LOADRESP message, separated by commas. Indexes start with zero and
match a list of files that was received by LOAD command. For example, if
 there is only one video file in torrent file, then 0 index has to be
sent.

If there are 5 video files in torrent and playback has to start
from the first one, but others have to be loaded, then 0,1,2,3,4 have to
 be sent.

If the third file has to be played, without loading others, 2 has to be sent.

**torrent_url** - link to torrent file (for example, http://sometracker.com/torrent/12345)

**torrent_infohash** - torrent's infohash

**player_id** - player's code

**torrent_data** - torrent-file's content, encoded in base64

**direct_url** - direct link to file (for example, http://somesite.com/files/video.mp4

**developer_id** - developer's code (if unknown, 0 must be sent)

**affiliate_id** - partner's code (if unknown, 0 must be sent)

**zone_id** - code of partner's zone (if unknown, 0 must be sent)

**GETPID** <infohash> <developer_id> <affiliate_id> <zone_id>

Getting code of the player through a set of parameters. This
command is a synchronous command (see below). In response player's code
or empty string (if player's code can't be received) is sent.

**SHUTDOWN**

Close connection with client.

**STOP**

Stop loading file that is being loaded at this moment.

**DUR** <video_url> <duration>

Inform TS Engine about duration of video file that is being
played by client at this moment. This command must be sent right after
client had determined content duration.

**Parameters:**

**video_url** - link to video, which was sent to client after the end of pre-buffering

**duration** - duration in milliseconds

**PLAYBACK** <video_url> <event>

Inform TS Engine about percentage of played video

This command is especially important when playing advertising
video - transition to the main video happens only after TS Engine gets
command PLAYBACK 100 (after client has played advertising video till the
 end)

**Parameters:**

**video_url** - link to video, which was sent to client after the end of pre-buffering

**event** - one of these events:

0 - starting playback

25 - 25% of video has been played

50 - 50% of video has been played

75 - 75% of video has been played

100 - 100% of video has been played

## Outgoing commands

**HELLOTS**

response command as a part of handshake procedure

**AUTH** <auth_level>

User's access level

auth_level - integer - access level

At this moment two values of access level are available:

0 - advanced features are not available for user (rewind and playback of torrent files with several video files)

1 - advanced features are available for user

**STATE** <state_id>

Information about current state of TS Engine

**SHUTDOWN**

TS Engine finished its work

**PLAY** <video_url>

**PLAYAD** <video_url>

**PLAYADI** <video_url>

Start playing video by video_url link (this link leads to http-server, embedded in TS Engine).

**PLAY** - playback of the main video

**PLAYAD** - playback of uninterrupted advertising video (user can't rewind or skip this advertising video)

**PLAYADI** - playback of interrupted advertising video (user can rewind or skip this advertising video)

**PAUSE**

TS Engine began buffering, because there's not enough data for video playback without interruptions

**RESUME**

TS Engine finished buffering

**LOADRESP** <request_id> <response>

Response to LOAD command

**request_id** - request identifier

**response** - a list of files in json format in this form:

```
{
 "status": 1,
 "infohash": "abcd1234",
 "files": [
   ["file1.mp4", 0],
   ["file2.avi", 1],
   ["file3.mkv", 5]
 ]
}

```

**status** - 0: there are no video files in torrent, 1 -
there is one video file in torrent, 2 - there are more than one video
files in torrent

**infohash** - torrent infohash

**files** - a list of files; this is an array, each
element of which consists of an array with two elements: the first -
file's name, the second - file's position in torrent (this position must
 be sent inside START command to specify which file to download, if
there are several of them).

Files' names are transferred in UTF-8 encoding in urlencoded form.

**INFO** <message_id>;<message_text>

Info message

**message_id** - message code

**message_text** - message text

**STATUS** <status_string>

This message is sent periodically to inform client about current state of content download.

**status_string** - string in format described below

If the main content is being played:

```
STATUS main:status_string
```

If advertising video is being played:

```
STATUS main:status_string|ad:status_string
```

**status_string:**

TS Engine does nothing - **idle**

error - **err;error_id;error_message** (code and description)

checking - **check;progress**

prebuffering - **prebuf;progress;time**

download - **dl**

buffering - **buf;progress;time**

waiting for sufficient speed - **wait;time**

Common data is added to all status_string (except idle, err, check):

```
total_progress;immediate_progress;speed_down;http_speed_down;speed_up;peers;http_peers;downloaded;http_downloaded;uploaded
```

**total_progress** - how much of this file is downloaded

**immediate_progress** - how much uninterruptible data is downloaded starting from the current position (to show amount of downloaded data)

All numbers are sent as integer.

All progress takes values from 0 to 100.

**Examples:**

```
STATUS main:prebuf;45;30|ad:buf;69
STATUS main:dl|ad:dl
```

**Example of tranformation statuses into text messages that user can understand:**

```
check - Checking xx%
prebuf - Prebuffering xx%
buf - Buffering xx%
wait - Waiting sufficient download speed
err - showing an error message
dl, idle - doing nothing
```

## Events

**EVENT event_name param1_name=param1_value param2_name=param2_value ...**

Parameters are not required.

Parameter values - **urlencoded utf-8**

## Examples

**>>** - messages from client to TS Engine

**<<** - messages from TS Engine to client

1) Playback of torrent-file by link without commercials (TS Engine determines whether it's needed to play commercials).

Asynchronous command LOADASYNC is used to load torrent's content.

Torrent file contains one video file.

handshake

```
>>HELLOBG
<<HELLOTS
```

client is ready to receive messages

```
>>READY
```

advanced functions are available for user

```
<<AUTH 1
```

load torrent by link

```
>>LOADASYNC 467763 TORRENThttp://rutor.org/download/67346 0 0 0
<<LOADRESP 467763 {"status": 1, "files": [["Prey%202_%20E3%202011%20Official%20Trailer_2.mp4", 0]], "infohash":
"4c78e1cf0df23b4f5a16a106829ebed710cb52e0"}
```

get player's code (for example, to show it to user)

```
>>GETPID 4c78e1cf0df23b4f5a16a106829ebed710cb52e0 0 0 0
<<##36ae4c89ab45b4010b1461c513da38d007356195
```

start video pre-buffering

```
>>START TORRENThttp://rutor.org/download/67346 0 0 0 0
```

pre-buffering is in the process

```
<<STATE 1
<<STATUS main:prebuf;0;2147483447;0;0;0;0;0;0;0;0;0;0
<<STATUS main:prebuf;0;2132;0;0;29;0;0;8;0;131072;0;0
<<STATUS main:prebuf;8;942;0;0;60;0;0;9;0;393216;0;0
<<STATUS main:prebuf;50;591;0;0;87;0;0;8;0;835584;0;0
<<STATUS main:prebuf;75;497;0;0;98;0;0;8;0;1146880;0;0
<<STATUS main:prebuf;91;448;0;0;105;0;0;8;0;1441792;0;0
```

pre-buffering is finished, client gets a link for content playback

```
<<PLAYhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974
<<STATE 2
```

client sends content duration (about 201 seconds)

```
>>DURhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974 201964
```

client informs that playback was started

```
>>PLAYBACKhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974 0
```

TS Engine loads content

```
<<STATUS main:dl;0;0;110;0;0;8;0;1622016;0;0
<<STATUS main:dl;0;0;128;0;0;8;0;2965504;0;0
<<STATUS main:dl;0;0;130;0;0;8;0;3129344;0;0
```

TS Engine doesn't have enough data for playback, starts buffering

```
<<PAUSE
<<STATE 3
<<STATUS main:buf;0;315;0;0;130;0;0;8;0;3260416;0;0
<<STATUS main:buf;90;299;0;0;133;0;0;8;0;3866624;0;0
<<STATUS main:buf;90;278;0;0;138;0;0;8;0;4390912;0;0
```

buffering is finished

```
<<RESUME
<<STATE 2
<<STATUS main:dl;0;0;141;0;0;8;0;4898816;0;0
```

client has played 25% of content

```
>>PLAYBACKhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974 25
<<STATUS main:dl;0;0;141;0;0;8;0;4898816;0;0
<<STATUS main:dl;0;0;146;0;0;7;0;8388608;0;0
```

client has played 50% of content

```
>>PLAYBACKhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974 50
<<STATUS main:dl;0;0;145;0;0;7;0;9404416;0;0
```

client has played 75% of content

```
>>PLAYBACKhttp://127.0.0.1:6878/content/4c78e1cf0df23b4f5a16a106829ebed710cb52e0/0.673752283974 75
<<STATUS main:dl;0;0;146;0;0;7;0;9568256;0;0
```

stop content loading

```
>>STOP
<<STATE 0
```

disconnect

```
>>SHUTDOWN
<<SHUTDOWN
```