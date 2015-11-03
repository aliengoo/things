"use strict";

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("../wwwroot"));
app.use(bodyParser.json());
app.use(cors());

// routes
require('./routes/motd-route')(app);

// sockets
io.sockets.on('connection', function (socket) {

});



app.listen(3000, () => console.log("I'm listening..."));
