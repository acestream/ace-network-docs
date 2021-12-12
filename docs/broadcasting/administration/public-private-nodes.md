# Configuring public and private nodes

Public node is accessible from any address.

Private node is accessible from the configured addresses only. Here are options that are used to configure private nodes:

- `--private-node` - an option to make node private
- `--upload-to` - allow uploading to the specified node
- `--download-from` - allow downloading from the specified node
- `--monitor-node-ip` - allow to access HTTP interface from the specified address

## Examples

We'll use the following nodes in examples:

- source node: 192.168.1.2:7764
- support node 1: 192.168.101:8640
- support node 2: 192.168.102:8640

Some required options are missed in example - we only demonstrate options related to public/private node configuration here.

### Public source node

![Single public source node]({{assets_root}}/images/broadcasting/public-private-nodes/example_1.jpg "Single public source node")

Running the source node:

```bash
# the node is public if no --private-node option is specified
start-engine --stream-source-node
```

### Public source node and two public support nodes

![Public source node and two public support nodes]({{assets_root}}/images/broadcasting/public-private-nodes/example_2.jpg "Public source node and two public support nodes")

Running the source node:

```bash
start-engine --stream-source-node \
    --upload-to "192.168.1.101:8640" \
    --upload-to "192.168.1.102:8640"
```

Running support nodes:

```bash
start-engine --stream-support-node --download-from "192.168.1.2:7764"
```

### Private source node and two public support nodes

![Private source node and two public support nodes]({{assets_root}}/images/broadcasting/public-private-nodes/example_3.jpg "Private source node and two public support nodes")

Running the source node:

```bash
start-engine --stream-source-node \
    --private-node 1 \
    --upload-to "192.168.1.101:8640" \
    --upload-to "192.168.1.102:8640"
```

Running support nodes:

```bash
start-engine --stream-support-node --download-from "192.168.1.2:7764"
```