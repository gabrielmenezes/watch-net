const express = require('express');

const server = express();


// GET, POST, PUT, DELETE

server.get('/', (req, res) => {
    return res.send('Hello  World!');
});

server.listen(3333);