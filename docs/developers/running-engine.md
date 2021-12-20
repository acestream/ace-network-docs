# Running the Engine

## Windows

```powershell
cd \path\to\engine

# Run in GUI mode
ace_engine.exe

# Run in console mode
ace_console.exe --client-console
```

## Linux

```bash

# Run in GUI mode
/path/to/engine/start-engine --client-gtk

# Run in console mode
/path/to/engine/start-engine --client-console
```


## Android

Please refer to [Using the Engine on Android][1]


## Command Line Options

| Name                        | Type   | Description |
| --------------------------- | ------ | --- |
| --port                      | int    | P2P node port. It's used to communicate with other peers. Default: `8621`. |
| --api-port                  | int    | Deprecated. TCP port for old (deprecated) engine API. Default: `62062`.  |
| --http-port                 | int    | HTTP API port. Default: `6878` |
| --bind-all                  | flag   | Allow access to HTTP API both from intranet and outside world. |
| --state-dir                 | path   | Path to state directory. Default: `~/.ACEStream`. |
| --cache-dir                 | path   | Path to cache dir. |
| --cache-limit               | int    | Console mode only. Disk cache limit in Gb. |
| --cache-max-bytes           | int    | Console mode only. Disk cache limit in bytes. |
| --cache-auto                | bool   | Console mode only. Enable automatic disk cache management (based on available free space). |
| --login                     | string | Username |
| --password                  | string | Password |
| --access-token              | string | Set access token to secure node's monitoring interface. |
| --make-default-access-token | bool   | Generate random access token. Default: `true`. |
| --use-internal-buffering    | bool   | Enable internal "buffering" module. Default: `false`. |


<!--
TODO:

--client-console
--client-wx
--client-gtk
--stream-source-node
--stream-support-node
--create-hls-transport

--log-stdout
--log-stderr
--log-stdout-level
--log-stderr-level
--log-file
--log-file-mode
--log-max-size
--log-backup-count
--log-modules
--log-debug

--allow-user-config
'--user-agent

--max-connections
--max-peers
--max-peers-limit
--max-upload-slots
--min-upload-slots

--fix-upload-slots
--fix-upload-slots-interval
--wanted-slots-factor
--startup-slots-factor

--startup-upload-slots
--startup-max-peers

--slots-manager-use-cpu-limit
--slots-manager-cpu-low-limit
--slots-manager-cpu-high-limit
--slots-manager-cpu-low-limit-per-core
--slots-manager-cpu-high-limit-per-core
--slots-manager-min-slots

--live-cache-type
--live-disk-cache-size
--live-mem-cache-size
--live-cache-auto-size
--live-cache-auto-size-reserve
--live-cache-max-memory-percent
--delete-pieces-before-playback
--delete-pieces-before-playback-max-iterations
--delete-chunks-before-playback
--delete-chunks-before-playback-max-iterations
--live-buffer-time
--live-max-buffer-time
--live-adjust-buffer-time

--vod-cache-type

--disk-cache-limit
--memory-cache-limit

# live output
--live-disable-multiple-read-threads
--live-stop-main-read-thread

--upnp-enabled
--stats-report-interval
--stats-report-peers
--service-access-token
--service-remote-access
--service-remote-allow-cors
--sync-regular-interval
--sync-error-interval
--disk-cache-cleanup-interval-active
--disk-cache-cleanup-interval-inactive

# special node settings
--private-node
--upload-to
--download-from
--monitor-node-ip
--ip-filter-config
-->


[1]: using-engine-on-android.md