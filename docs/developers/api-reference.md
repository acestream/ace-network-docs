# API Reference

NOTE: we plan to completely refactor HTTP API following the modern RESful API design principles. Please read our news to be in touch.

## Playback Endpoints

Endpoints:

```
/ace/getstream
/ace/manifest.m3u8
```

| Name | Type | Description |
| --- | --- | --- |
| format | enum | Possible values: redirect, json. Default: redirect |
| pid | string |  |
| sid | string | Alias of pid (deprecated) |
| playlist_output_format_vod | enum |  |
| playlist_output_format_live | enum |  |
| playlist_selected_indexes | list of integers |  |
| start_from | string |  |
| _idx | integer |  |
| next_file_indexes | list of integers |  |
| quality | integer |  |
| stream_id | integer |  |
| provider | string |  |
| direct_url | string |  |
| content_id | string |  |
| id | string | Alias of content_id (deprecated) |
| infohash | string |  |
| url | string |  |
| magnet | string |  |
| mode | string |  |
| debug_options | string |  |
| cas | string |  |
| use_api_stop | bool |  |
| use_api_events | bool |  |
| use_stop_notifications | bool |  |
| transcode_audio | bool |  |
| transcode_mp3 | bool |  |
| transcode_ac3 | bool |  |
| preferred_audio_language | string |  |
| disable_p2p | bool |  |
| product_key | string |  |
| secondary_product_key | string |  |
| hlc | bool |  |
| allow_multiple_threads_reading | bool |  |
| stop_prev_read_thread | bool |  |
| proxy_vast_response | bool |  |
| force_session_restart | bool |  |
| gdpr_consent | bool |  |
| force_ads | bool |  |
| is_restarted_session | bool |  |
| collect_start_stats | bool |  |

## /webui/api/service endpoint

Common parameters:

| Name | Type | Description |
| --- | --- | --- |
| method | string | Method name (required) |

### get_version

Get engine version

Parameters: none

Response:

| Name | Type | Description |
| --- | --- | --- |
| version | string | The engine version (human readable) |
| code | integer | Version code (machine readable version) |
| platform | enum | Possible values: linux, win32, android |

Example:

```
$ curl "http://127.0.0.1:6878/webui/api/service?method=get_version"
{
    "result": {
        "code": 3017000,
        "platform": "linux",
        "version": "3.1.70"
    },
    "error": null
}
```

## /service/api endpoint

### Public and Private Methods

Private methods require an "access token" in the request parameters. The token
is retrieved with `get_api_access_token` method. This method is not CORS-allowed
thus the token cannot be retrived from untrusted environment (e.g. a browser
window).

Public methods can be accessed without an access token.


### Remote Access

By default engine API can be accessed from the localhost (127.0.0.1) and from the intranet (from addresses is the same subnet).

Access from the Internet (any other addresses) is denied by default.

To allow/deny access from the intranet use `set_allow_intranet_access` method.

To allow/deny access from the Internet use `set_allow_remote_access` method.


### Common Parameters

| Name | Type | Description |
| --- | --- | --- |
| method | string | Method name (required) |
| api_version | integer | API version. Current version: 3. |

### get_api_access_token

Get a token to access private methods.

Public: yes

Remote access: no

Parameters: none

Response:

| Name | Type | Description |
| --- | --- | --- |
| token | string | Access token |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_api_access_token"
{
    "result": {
        "token": "3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
    }
}
```

### set_allow_remote_access

Allow API access from the Internet.

Public: no

Remote access: no

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| value | bool | New value for this option |

Response: none

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=set_allow_remote_access&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&value=0"
{
    "result": "ok"
}
```

### set_allow_intranet_access

Allow API access from the intranet.

Public: no

Remote access: no

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| value | bool | New value for this option |

Response: none

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=set_allow_intranet_access&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&value=0"
{
    "result": "ok"
}
```

### get_available_players

Get the list of available players. The engine detects installed video players on the host where the engine is installed. The player from this list can be used in `open_in_player` method.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| content_id | string | This parameter is required for engine versions <3.1.70. You can pass any string, it doesn't matter. |

Response:

| Name | Type | Description |
| --- | --- | --- |
| id | string | Unique ID of the player |
| type | enum | Possible values: proxy, aircast |
| protocol | enum | Possible values: acestreamcast, chromecast |
| name | string | Name of the player |
| icon | string | URL of the player icon (if present) |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_available_players&content_id=test"
{
    "result": {
        "players": [
            {
                "protocol": "acestreamcast",
                "icon": null,
                "type": "aircast",
                "id": "6ea36f57f0851df0f31175311320eb8fc04232ae",
                "name": "AFTMM (AceCast)"
            },
            {
                "protocol": "chromecast",
                "icon": null,
                "type": "aircast",
                "id": "a2b22152a15ed286efe19c4c23b93d31dc5147a8",
                "name": "MIBOX3"
            },
            {
                "protocol": "acestreamcast",
                "icon": null,
                "type": "aircast",
                "id": "991e6b04508c35e4fd9ea3d1a816ca15c69dd6b3",
                "name": "MIBOX3 (AceCast)"
            },
        {
                "protocol": null,
                "icon": null,
                "type": "proxy",
                "id": "a390495348954beae13031b4b0ed822fcc49ee5b",
                "name": "VLC"
            }
        ]
    }
}
```

### open_in_player

Start playback in the specified player.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| player_id | string | Player ID (from get_available_players response) |
| content_id | string | Content ID |
| infohash | string | Infohash |
| url | string | URL of the transport file |

Response: none

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=open_in_player&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&player_id=a390495348954beae13031b4b0ed822fcc49ee5b"
{
    "result": "ok"
}
```

### get_media_files

Get the contents of the transport file

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| content_id | string | Content ID |
| infohash | string | Infohash |
| url | string | URL of the transport file |
| magnet | string | Magnet link |
| mode | enum | Possible values: brief, full |
| expand_wrapper | bool |  |
| dump_transport_file | bool |  |
| analyze_content | bool |  |
| create_wrappers | bool |  |

Response:

| Name | Type | Description |
| --- | --- | --- |
| infohash | string | Infohash |
| name | string | Name of the content |
| type | enum | live, vod |
| transport_type |  | bt, hls, wrapper |
| filename | string | Name of the file. It makes sense for VOD files only. |
| mime | string | MIME type |
| size | integer | File size |
| index | integer | File index |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_media_files&infohash=0a4848271c91ce2d8965ce416267c25047dc8141"
{
    "result": {
        "files": [
            {
                "index": 0,
                "filename": "Promo Channel"
            }
        ],
        "name": "Promo Channel",
        "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141",
        "transport_type": "bt",
        "type": "live",
        "transport_file_cache_key": null
    }
}
```

### get_content_id

Get Content ID of the transport file or playlist item.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| playlist_item_id | integer | Internal playlist item id |
| infohash | string | Infohash |
| url | string | URL of the transport file |

Response:

| Name | Type | Description |
| --- | --- | --- |
| content_id | string | Content ID |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_content_id&infohash=0a4848271c91ce2d8965ce416267c25047dc8141"
{
    "result": {
        "content_id": "d8c669b572574be7ebcb921e35b4caab695ee36b"
    }
}
```

### get_channel_icon

TBD

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | TBD |
| common_name | string | TBD |
| item_hash | string | TBD |

Response: image (binary response)

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_channel_icon&id=5"
<binary response>
```

### analyze_content

Analyze content in query.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| query | string | TBD |
| title | string | TBD |

Response:

| Name | Type | Description |
| --- | --- | --- |
| content_type | enum | transport_file, hls, hls_vode, direct_content, direct_stream, playlist |
| transport_type | enum | bt, hls |
| content_id | string | Content ID |
| infohash | string | Infohash |
| item_url | string | Content URL |
| title | string | Title |
| is_live | integer | 0=VOD, 1=live, -1=unknown |
| categories | list of strings | List of categories |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=analyze_content&query=acestream%3A%3Finfohash%3D0a4848271c91ce2d8965ce416267c25047dc8141"
{
    "result": {
        "is_live": 1,
        "item_url": null,
        "transport_type": "bt",
        "content_type": "transport_file",
        "title": "Promo Channel",
        "content_id": null,
        "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141",
        "categories": [
            "entertaining"
        ]
    }
}
```

### analyze_content_multi

Analyze multiple content items.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| query | multiple | The same as query parameter of analyze_content method. This parameter can be repeated several times to analyze multiple content items. |

Response: the list of objects. Each object is the same as response from `analyze_content`

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=analyze_content_multi&query=acestream%3A%3Finfohash%3D0a4848271c91ce2d8965ce416267c25047dc8141&query=test"
{
    "result": [
        {
            "result": {
                "is_live": 1,
                "item_url": null,
                "transport_type": "bt",
                "content_type": "transport_file",
                "title": "Promo Channel",
                "content_id": null,
                "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141",
                "categories": [
                    "entertaining"
                ]
            }
        },
        {
            "error": {
                "message": "unknown protocol",
                "code": 0
            }
        }
    ]
}
```

### analyze_deferred_playlist_items

Analyze specified deferred playlist items and update playlist (TBD: need more details)

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| playlist_item_id | multiple | TBD |
| use_media_groups | bool | TBD |

Response: TBD

Example: TBD

### get_status

Get engine status

Public: yes

Remote access: yes

Parameters: none

Response:

| Name | Type | Description |
| --- | --- | --- |
| version | string | Version name |
| code | integer | Version code |
| platform | enum | linux, win32, android |
| playlist_loaded | bool | Whether the engine finished loading internal playlist after start. |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_status"
{
    "result": {
        "playlist_loaded": true,
        "version": {
            "code": 3017000,
            "platform": "linux",
            "version": "3.1.70"
        }
    }
}
```

### get_network_connection_status

Get network connection status

Public: yes

Remote access: yes

Parameters: none

Response:

| Name | Type | Description |
| --- | --- | --- |
| connected | bool | Whether the engine is connected to the Internet. |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=get_network_connection_status"
{
    "result": {
        "connected": true
    }
}
```

### parse_m3u_playlist

Extract EPG sources from an M3U playlist.

Public: yes

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| url | string | URL of the playlist |

Response:

| Name | Type | Description |
| --- | --- | --- |
| epg_sources | list of strings | URLs of all EPG sources found in the playlist |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=parse_m3u_playlist&url=http%3A%2F%2Fexample.com%2Ftest%2Fplaylist.m3u8"
{
    "result": {
        "epg_sources": [
            "https://www.teleguide.info/download/old/xmltv.xml.gz"
        ]
    }
}
```

### playlist_add_item

Add an item to the playlist

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| title | string |  |
| description | string |  |
| content_id | string |  |
| infohash | string |  |
| file | file |  |
| logo_file | file |  |
| use_media_groups | bool |  |
| auto_search | bool |  |
| is_live | integer |  |
| hls_manifest_url | string |  |
| dash_manifest_url | string |  |
| video_url | string |  |
| category | string |  |
| subcategory | string |  |
| tags | JSON-encoded list of strings |  |
| poster | string |  |

Response: ID of the added item (integer)

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_add_item&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&title=Test%20Channel"
{
    "result": 1
}
```

### playlist_update_item

Update playlist item

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| logo_file | file |  |
| title | string |  |
| poster | string |  |
| auto_search | bool |  |
| is_favorite | bool |  |
| use_media_groups | bool |  |
| tags | JSON-encoded list of strings |  |

Response: boolean value ("true" means that operation was successful)

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_update_item&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&title=Test%20Channel%202&id=1"
{
    "result": true
}
```

### playlist_delete_item

Delete an item from the playlist. Deleted item is moved to trash.

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| use_media_groups | bool |  |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_delete_item&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&id=1"
{
    "result": "ok"
}
```

### playlist_delete_items

Delete multiple items from the playlist. Deleted items are moved to trash.

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string | Playlist owner |
| ids | list of integers | List of items' ID to delete |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_delete_items&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&ids=1,2&owner=_no_owner_"
{
    "result": "ok"
}
```

### playlist_restore_item

Restore an item from trash

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string | Playlist owner |
| id | integer | Item ID |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_restore_item&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&id=1&owner=_no_owner_"
{
    "result": "ok"
}
```

### playlist_trash_get

Get the trash

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string |  |

Response:

| Name | Type | Description |
| --- | --- | --- |
| data | list of objects | List of playlist items in the trash |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_trash_get&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&owner=_no_owner_"
{
    "result": {
        "data": [
            {
                "subcategory": "",
                "external_playlist_id": -1,
                "display_title": "Test Channel 2",
                "updated_at": 1639520749,
                "is_favorite": false,
                "tvg_name": "",
                "is_multi_vod": false,
                "id": 1,
                "category": null,
                "title": "Test Channel",
                "tvg_id": "",
                "languages": null,
                "tvg_logo": "",
                "is_wrapped_url": 0,
                "description": "",
                "tags": [
                    "entertaining"
                ],
                "poster": "",
                "content_type": "live",
                "locked": false,
                "is_multi_tfile": false,
                "is_deleted": true,
                "auto_search": false,
                "url": null,
                "created_at": 1639556341,
                "countries": null,
                "enabled": true,
                "is_live": 1,
                "transport_type": "bt",
                "content_id": null,
                "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141"
            }
        ]
    }
}
```

### playlist_trash_clear

Clear the trash

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string | optional |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_trash_clear&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&owner=_no_owner_"
{
    "result": "ok"
}
```

### playlist_get

Get the playlist

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string | optional |

Response:

| Name | Type | Description |
| --- | --- | --- |
| total_items | integer | Playlist size |
| playlist | list of objects | List of playlist items |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_get&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
{
    "result": {
        "total_items": 1,
        "playlist": [
            {
                "subcategory": "",
                "external_playlist_id": -1,
                "display_title": null,
                "updated_at": 1639521822,
                "is_favorite": false,
                "tvg_name": "",
                "icons": [],
                "is_multi_vod": false,
                "tvg_id": "",
                "category": null,
                "title": "Promo Channel",
                "id": 3,
                "languages": null,
                "hash_v2": "534aaf8587aac029e26aa5ce4d092864",
                "poster": "",
                "is_wrapped_url": 0,
                "hash": "2a1b773691cd87c9a60f8863e193d334",
                "description": "",
                "tags": [
                    "entertaining"
                ],
                "tvg_logo": "",
                "show_autosearch": true,
                "content_type": "live",
                "is_deleted": false,
                "is_multi_tfile": false,
                "locked": false,
                "auto_search": false,
                "url": null,
                "created_at": 1639559461,
                "countries": null,
                "enabled": true,
                "is_live": 1,
                "transport_type": "bt",
                "content_id": null,
                "infohash": "0a4848271c91ce2d8965ce416267c25047dc8141"
            }
        ]
    }
}
```

### playlist_clear

Clear the playlist (all items are deleted permanently)

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| owner | string |  |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_clear&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
{
    "result": "ok"
}
```

### playlist_item_set_favorite

Set or remove "favorite" flag for a playlist item

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| value | bool | New value for "favorite" flag |
| use_media_groups | bool |  |
| owner | string | optional |

Response: true on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_item_set_favorite&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&id=4&value=1"
{
    "result": true
}

```

### playlist_item_set_enabled

Enable or disable playlist item

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| value | bool | `true` to enable, `false` to disable |
| use_media_groups | bool |  |
| owner | string | optional |

Response: true on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_item_set_enabled&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&id=4&value=0"
{
    "result": true
}

```

### playlist_items_set_enabled

Enable or disable multiplce playlist items

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| ids | list of integers | Item IDs |
| value | bool | `true` to enable, `false` to disable |
| use_media_groups | bool |  |
| owner | string | optional |

Response: true on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_items_set_enabled&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&ids=4,8&value=1"
{
    "result": true
}

```

### playlist_item_set_locked

Lock or unlock playlist item

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| value | bool | `true` to lock, `false` to unlock |
| use_media_groups | bool |  |
| owner | string | optional |

Response: true on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_item_set_locked&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&id=4&value=1"
{
    "result": true
}

```

### playlist_item_set_auto_search

Enable or disable "autosearch" feature for a playlist item

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Item ID |
| value | bool | `true` to enable, `false` to disable |
| owner | string | (required) Playlist owner |

Response: true on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=playlist_item_set_auto_search&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&infohash=0a4848271c91ce2d8965ce416267c25047dc8141&id=4&owner=_no_owner_&value=1"
{
    "result": "ok"
}

```

### playlist_import

Import playlist from the uploaded files

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| file | file | Playlist file (M3U) |

Response:

| Name | Type | Description |
| --- | --- | --- |
| task_id | integer | ID of the background task for importing the playlist |

Example: TBD

### external_playlist_add

Add external playlist

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| type | enum | Required. Values: content, broadcast. |
| category | string | Required. Playlist category (any string). |
| name | string | Required. Playlist name (any string). |
| url | string | Required. URL of the playlist. |
| update_interval | integer | Required. Playlist update interval in seconds. |
| update_now | bool | Optional. Default: true. |
| login | string | Optional. Login for HTTP Basic authentication. |
| password | string | Optional. Password for HTTP Basic authentication. |

Response: new playlist id (integer)

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=external_playlist_add&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&type=content&category=tv&name=Test%20Playlist&url=http%3A%2F%2Fexample.com%2Fplaylist.m3u&update_interval=86400"
{
    "result": 0
}

```

### external_playlist_delete

Delete external playlist. All the content imported from this playlist is also deleted.

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Required. Playlist ID. |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=external_playlist_delete&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&id=0"
{
    "result": "ok"
}

```

### external_playlist_update

Method description

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Required. Playlist ID. |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=external_playlist_update&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&id=1"
{
    "result": "ok"
}

```

### external_playlist_edit

Edit external playlist.

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Required. Playlist ID. |
| category | string | Required. Playlist category. |
| name | string | Required. Playlist name. |
| update_interval | integer | Required. Playlist update interval in seconds. |
| login | string | Optional. Login for HTTP Basic authentication. |
| password | string | Optional. Password for HTTP Basic authentication. |

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=external_playlist_edit&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&id=1&category=tv&name=Test%20Playlist%202&update_interval=86400&login&password"
{
    "result": "ok"
}
```

### external_playlist_get

Get info about external playlist.

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| id | integer | Optional. If set then playlist with the specified ID is returned. Otherwise all playlists are returned. |

Response:

| Name | Type | Description |
| --- | --- | --- |
| id | ineteger | Playlist ID |
| type | enum | Values: content, broadcast. |
| category | string | Playlist category. |
| name | string | Playlist name. |
| url | string | URL of the playlist. |
| login | string | Login for HTTP Basic authentication. |
| password | string | Password for HTTP Basic authentication. |
| update_interval | integer | Playlist update interval in seconds. |
| updated_at | integer | When the playlist was last modified (created or edited) (UNIX timestamp) |
| last_update | integer | When the playlist was last updated (UNIX timestamp) |
| next_update | integer | When the playlist will be updated next time (UNIX timestamp) |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=external_playlist_get&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
{
    "result": {
        "playlist": [
            {
                "updated_at": 1639621747,
                "next_update": 1950689183,
                "password": "",
                "login": "",
                "category": "tv",
                "name": "Test Playlist 2",
                "url": "http://example.com/playlist2.m3u",
                "id": 1,
                "update_interval": 311040000,
                "type": "content",
                "last_update": 1639649183
            }
        ]
    }
}
```

### update_all_external_playlists

Update all external playlists

Public: no

Remote access: yes

Parameters: none

Response:

| Name | Type | Description |
| --- | --- | --- |
| task_id | integer | Background task id. |

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=update_all_external_playlists&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
{
    "result": {
        "task_id": 17
    }
}
```

### check_auth

Check user authorization

Public: no

Remote access: yes

Parameters: none

Response: TBD

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=check_auth&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"

# User is not signed in:
{
    "result": {
        "package_name": null,
        "global_auth_level": 0,
        "purse_amount": -1,
        "auth_level": 0,
        "session_auth_level": -1,
        "package_color": -1,
        "bonus_amount": -1,
        "token": null,
        "bonuses_updated_at": 0,
        "login": null,
        "package_days_left": -1,
        "method": "none",
        "ace_auth_token": null
    }
}

# User is signed in:
{
    "result": {
        "package_name": "Standard",
        "global_auth_level": 165,
        "purse_amount": 5850,
        "auth_level": 165,
        "session_auth_level": -1,
        "package_color": "green",
        "bonus_amount": 62,
        "token": "user@email.com",
        "bonuses_updated_at": 1566988921,
        "login": "user@email.com",
        "package_days_left": 284,
        "method": "acestream",
        "ace_auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJhY2VzdHJlYW0iLCJzdWIiOiJhcGlzaGVsQGdtYWlsLmNvbSIsImlhdCI6MTYzOTY1MzU5OSwiZXhwIjoxNjM5NjYwODU5fQ.X4kXKZaD4enIz2ENQ0CzYH5vF-_zKpTz48S4D5dgJbXtDcxEmVg7udL2TSn1m4ZdG3Z0n7NXf_EXIkrcjy6Z_A"
    }
}
```

### sign_in

Sign in the user

Public: no

Remote access: yes

Parameters:

| Name | Type | Description |
| --- | --- | --- |
| email | string | Email (used to sign in with email and password) |
| password | string | Password (used to sign in with email and password) |
| google_token | string | Google auth token (used to sign in with Google) |

Response: "ok" string on success

Example:

```
# Sign in with email and password
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=sign_in&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99&password=testpass&email=user%40email.com"

# Bad username or password
{
    "error": {
        "message": "auth_error",
        "code": 0
    }
}

# Success
{
    "result": "ok"
}

```

### sign_out

Sign out the user

Public: no

Remote access: yes

Parameters: none

Response: "ok" string on success

Example:

```
$ curl "http://127.0.0.1:6878/server/api?api_version=3&method=sign_out&token=3c3a67a7048cfa2e2097b2a5491c57121e39ab496f4b7b72d947088a87752a99"
{
    "result": "ok"
}
```


## /search endpoint

Perform a search in decentralized network

Public: yes

Remote access: yes

Parameters: none

| Name | Type | Description |
| --- | --- | --- |
| query | string | Query string for the search request |

Response: TBD

Example:

```
$ curl "http://127.0.0.1:6878/search?query=science"
{
    "result": {
        "total": 2,
        "results": [
            {
                "items": [
                    {
                        "status": 2,
                        "languages": [
                            "kor"
                        ],
                        "name": "YTN SCIENCE",
                        "countries": [
                            "kr"
                        ],
                        "infohash": "396fc8ac05119f961b4da6f198ebd586f9fc9e2b",
                        "disabled": false,
                        "channel_id": 21614,
                        "availability_updated_at": 1639614482,
                        "availability": 1,
                        "categories": [
                            "tv"
                        ]
                    }
                ],
                "name": "YTN SCIENCE",
                "icons": [
                    {
                        "url": "http://c1.torrentstream.info/epg/icons/19335.png",
                        "type": 0
                    }
                ]
            },
            {
                "items": [
                    {
                        "status": 2,
                        "languages": [
                            "kor"
                        ],
                        "name": "YTN Science",
                        "countries": [
                            "kr"
                        ],
                        "infohash": "99283484424516bb92c58c46df11c4457ada96be",
                        "disabled": false,
                        "channel_id": 21614,
                        "availability_updated_at": 1639612142,
                        "availability": 1,
                        "categories": [
                            "tv"
                        ]
                    }
                ],
                "name": "YTN Science",
                "icons": [
                    {
                        "url": "http://c1.torrentstream.info/epg/icons/19335.png",
                        "type": 0
                    }
                ]
            }
        ],
        "request_time": 0.3309898376464844,
        "time": 0.2466
    }
}
```

<!--
TODO methods:

- get_available_epg_countries
- get_available_epg_languages
- get_epg_by_item_id
- upload_logos
- remove_all_logos
- get_logos_info
- get_content_providers
- get_media_count
- get_playlist_tags
- get_playlist_countries
- get_playlist_languages
- reset_epg_database
- trim_memory
- get_media_group
- get_media_group_search_results
- media_group_switch_media
- media_group_switch_auto
- media_group_init_background_search
- media_group_notify_media_started
- media_group_notify_media_failed
- media_group_set_media_status
- playlist_sync
- set_auto_sync
- epg_get_system_sources
- get_preferred_epg_languages
- set_preferred_epg_languages
- add_preferred_epg_language
- remove_preferred_epg_language
- get_preferred_epg_countries
- set_preferred_epg_countries
- add_preferred_epg_country
- remove_preferred_epg_country
- get_client_preference
- set_client_preference
- get_playlist_task_status
- set_enable_system_epg
- epg_source_get_list
- epg_source_add
- epg_source_delete
- epg_source_set_priority
- epg_source_update
- search_providers_get
- search_provider_check
- search_provider_add
- search_provider_update
- search_provider_delete
- set_locale
- set_transcode_audio
- set_preferred_audio_language
- set_preferred_video_quality
- set_preferred_video_bitrate
- set_transcode_mp3
- set_transcode_ac3
- set_playlist_output_format_live
- set_playlist_output_format_vod
- create_stream
- create_hls_transport_file
- search_by_infohashes
- suggest
- get_server_epg
-->
