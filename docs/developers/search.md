# Search

Engine has a builtin "search module" - a node in decentralized metasearch system (Ace Search).

The search module can be accessed via `/search` endpoint.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| query | string | Query string for the search request |
| category | enum | Filter by category. Possible values [here][1] |
| page | int | Page number (starting from 0, default is 0) |
| page_size | int | Page size (default is 10, maximum value is 200) |

## Response

| Name | Type | Description |
| --- | --- | --- |
| infohash | string | Content infohash |
| name | string | Content name |
| categories | list of strings | Content categories |
| availability | float | Content availability (float number between 0.0 and 1.0) |
| availability_updated_at | int | When the content availability was updated at (UNIX timestamp) |
| status | int | Content status based on its availability; 2 means "green" status - channel is available; 1 means "yellow" status - there is no guaranty that channel is working. |


## Example

```http
http://127.0.0.1:6878/search?query=science
```

```json
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
        "time": 0.2466
    }
}
```

[1]: knowledge-base/list-of-categories.md
