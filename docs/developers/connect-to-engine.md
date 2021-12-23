# Connect to the Engine

The engine provides HTTP API on the port 6878. The port can be changed by `--http-port` command line option.
Usually changing the default port is a bad idea because other apps expect that engine is listening on this port.

Before issuing any commands to the engine you should check that it's running.
The good practice is to do this with `get_version` command:

```bash
GET /webui/api/service?method=get_version
Host: 127.0.0.1:6878
```

If the engine is running you will get a response like this:

```json
{
    "result": {
        "code": 3017000,
        "platform": "linux",
        "version": "3.1.70"
    },
    "error": null
}
```
