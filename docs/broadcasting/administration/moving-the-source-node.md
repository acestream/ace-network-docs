# Moving the source node

To move the source node to another host without changing the infohash of the
stream:

- stop old node
- copy .sauth and .restart files to the new metadata dir
- start new node with the same options