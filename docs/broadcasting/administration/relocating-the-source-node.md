# Relocating the Source Node

## Summary

To relocate the source node to a different host without changing the infohash of the stream, follow these steps:

- Stop the old node.
- Copy the `.sauth` and `.restart` files to the new metadata directory.
- Start the new node with the same options.

## Stream Metadata Files

Stream metadata files store essential information about the stream that must persist between stream restarts.

There are two types of metadata files:

- The `.sauth` file stores the private key of the stream, which signs messages broadcasted to the network by the source node.
- The `.restart` file stores the number of the last generated piece.

When the source node is launched, it looks for these files in the `--metadata-dir` directory. The file name (excluding the extension) must match the value of the `--name` option.

If the metadata files exist, the source node uses them to start the stream:

- The key from the `.sauth` file signs messages.
- The source node generates new pieces starting from the number in the `.restart` file.

If the metadata files are not present, new ones are created:

- The source node generates a new key to sign messages and saves it to the `.sauth` file.
- New pieces are numbered starting from 0. Each time a new piece is generated, the `.restart` file is updated.

## Working with Metadata Files

Normally, you do not need to interact with metadata files, as they are automatically handled by the source node. The node creates new files on the first launch and loads existing files upon restart.

However, if you wish to move the source node to a different location, such as another server, you must also copy the metadata files. All metadata files must be placed in the `--metadata-dir` on the new host.

## Metadata files when starting stream from Web UI on Windows

When starting a stream from the Web UI on Windows, metadata files are saved by default in the `%APPDATA%\.ACEStream\streaming` location. These files are managed similarly to other platforms.

## Consequences of Losing Metadata Files

If the `.sauth` file is missing upon stream restart, the stream will have a new infohash and will not be accessible by the old one.

Restarting the stream without the `.restart` file will cause the piece numbering to restart from 1. While not critical, some clients may be confused if the restart occurs during a playback session.