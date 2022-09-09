# Intro

## Installation

To start broadcasting you need to install the Ace Stream Engine software.

The latest versions are [here][1].

There is no special software for broadcasting - the same software is used both
for the client node and for broadcasting. We call this software "the engine".
The engine can run in several modes depending on the command line parameters.

## How it works

To start broadcasting the engine is started in the "source node" mode - it
accepts input video stream and converts it to P2P stream.

For each stream unique transport file is created - a file in special format that
is used to uniquely identify the stream. Any other engine in the world can use
this file to connect to the stream.

The stream works as long as the source node is running.

Currently, the engine supports following inputs:

- MPEG TS over HTTP
- HLS


[1]: ../products/index.md
