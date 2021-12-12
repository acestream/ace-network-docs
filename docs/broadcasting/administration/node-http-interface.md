# Node HTTP Interface

Each node has an HTTP interface that allows:

- view current status,
- change parameters "on the fly" (without restarting the node)
- get the transport file of the current stream

HTTP interface works on the main port of the node (specified by parameter `--port`).

By default the interface is available only from the localhost.

To allow remote access, you have to run the node with the option `--service-remote-access`.
Also you can set a security token for HTTP interface to prevent unauthorized access, using option `--service-access-token`

Access to HTTP interface is performed via GET request:

```bash
# get node status
http://localhost:<port>/app/<token>/monitor

# update node parameters
http://localhost:<port>/app/<token>/update

# get transport file
http://localhost:<port>/app/<token>/get_transport_file?format=raw
```

If node was launched without option `--service-access-token`, then `<token>` part of the URL is omitted:

```bash
http://localhost:<port>/app/monitor
```

Responses are in JSON format.

## /monitor endpoint

Response fields:

- version - node's version
- max_connections - maximum number of TCP-connections
- max_peers - maximum number of concurrently connected nodes
- download_speed - current speed of data download (byte/s)
- upload_speed - current speed of data upload (byte/s)
- connected_peers_count - number of connected nodes
- connected_peers - list of connected nodes (empty, if option --stats-report-peers is not set)

## /update endpoint

Request syntax:

```
http://192.168.1.3:8640/app/update?param1=value1&param2=value2...
```

`param1` and `param2` are names of parameters that have to be updated, `value1` and `value2` are new values for these parameters.

The list of available parameters:

- max_peers
- TODO: add the rest of params

Example:

```bash
# set max number of peers to 100
http://192.168.1.3:8640/app/update?max_peers=100
```

## /get_transport_file endpoint

Request syntax:

```
http://192.168.1.3:8640/app/get_transport_file?format=raw
```

The response body contains raw transport file data.

This method is primarily used by support nodes to get transport file from the source node.