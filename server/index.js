const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const socketioServer = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(router);

socketioServer.on('connection', (socket) => {
    socket.emit('init', ('Hello!!'));
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});



