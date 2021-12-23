# Intro

Ace Stream Engine is the core component of Ace Stream software ecosystem. It is a standalone process that runs in the background and implements all the functionality of the Ace Stream node. The other software (both Ace Stream and third-party applications) access the engine via [HTTP API][1]. The engine acts a a gateway between local applications and Ace Stream P2P network.

In this section we will describe all the features that the engine provides to app developers.

All the things you can do with the engine can be divided into three groups:

- [connecting to the engine][2]
- [starting playback][3]
<!-- - [media servers tasks][4] -->
- [searching][5]

[1]: api-reference.md
[2]: connect-to-engine.md
[3]: start-playback.md
[4]: media-server.md
[5]: search.md
