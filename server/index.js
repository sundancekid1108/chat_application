const http = require('http');
const express = require('express');
const io = require('socket.io');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const socketioServer = io(server);

const PORT = process.env.PORT || 5000;

app.use(router);

socketioServer.on('connection', (socket) => {
    // console.log("new connection!!");
    // socket.on('disconnect', () => {
    //     console.log('disconnected');
    // });
    socket.emit('init', ('Hello!!'));

    socket.on('SEND_MESSAGE', (data) => {
        console.log(data);
        socketioServer.emit('RECEIVE_MESSAGE', data);
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});



