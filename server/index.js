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
    console.log("new connection!!");

    socket.emit('message', ('Hi There!!'));

    socket.broadcast.emit('message', 'New user has joined!');

    socket.on('disconnect', () => {
        socket.emit('message', ('User has left!!'));
    });
    
    socket.on('sendMessage', (message, callback) => {
        console.log(message);
        socket.emit('receiveMessage', message);
        callback();
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});



