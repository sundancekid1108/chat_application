const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const router = require('./router');
const { addUser, deleteUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const socketioServer = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(router);

socketioServer.on('connection', (socket) => {
    console.log("new connection!!");
    
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if( error ){
            console.log(error);
            return callback(error);     
        }
        socket.join(room);
        socket.emit('message',  { user: 'Admin', text : `${name}, welcome to room ${room}.`});
        socket.broadcast.to(user.room).emit('message', {user: 'Admin', text: `${name} has joined!` });
        socketioServer.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.dir(user);
        console.log(user.room);
        socketioServer.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        const user = deleteUser(socket.id);
        if(user){
            socketioServer.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            socketioServer.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
        
    });
});

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});



