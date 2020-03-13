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
    
    socket.on('join', ({name, room}) => {
        socket.join(room);
        socket.emit('message', `${name}, Welcome to room ${room}.`);
        socket.broadcast.to(room).emit('message', `${name} has joined!`);
    });

    socket.on('sendMessage', (message, callback) => {
        console.log('REACH SEND MESSAGE');
        socketioServer.emit('message', message);
        socket.to('test').emit('message', message);
        callback();
    });

    socket.on('disconnect', () => {
        socketioServer.emit('message', 'User has left!!');
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});



