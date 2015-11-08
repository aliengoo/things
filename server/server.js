"use strict";

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static("../wwwroot"));
app.use(bodyParser.json());
app.use(cors());

// routes
require('./routes/motd-route')(app);

// socketscd
io.sockets.on('connection', function (socket) {
  require('./socket-handlers/model-socket-handler')(socket);
});



server.listen(3000, () => console.log("I'm listening..."));
