# Content ID Generation

**Content ID** is a unique identifier of a transport file in ACE Stream system.

To receive Content ID you have to send HTTP POST request to the
address http://api.torrentstream.net/upload/raw. In body of the request
you have to transfer content of the transport file, base64-encoded.
Respond in JSON format:

- if successful:

    {"content_id": "xxxx"}

- if an error is occured:

    {"error": "error description"}


## Example of using on php

```php
<?php
$api_url = 'http://api.torrentstream.net/upload/raw';

try {
    $path = '/path/to/file.acelive';
    $data = file_get_contents($path);

    $opts = array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type: application/octet-stream\r\n",
            'content'=> base64_encode($data)
        )
    );
    $ctx = stream_context_create($opts);
    $response = file_get_contents($api_url, false, $ctx);
    echo $response . "\n";
}
catch(Exception $e) {
    echo $e->getMessage() . "\n";
}
?>

```