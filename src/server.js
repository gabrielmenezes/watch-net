const cluster = require('cluster');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const HrController = require('./Controllers/HrController');

const server = express();

mongoose.connect('mongodb://198.18.3.31:27017/watch-net',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

if (!cluster.isMaster){
    process.on('message', async (ipRemota) => {
        await HrController.testRemota(ipRemota);
        process.exit(0);
    });
}

// GET, POST, PUT, DELETE

server.use(express.json());
server.use(routes);


server.listen(3333);