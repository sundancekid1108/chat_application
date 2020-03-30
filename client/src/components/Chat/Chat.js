import React, {useState, useEffect} from 'react';
import socketIoClient from 'socket.io-client';
import queryString from 'query-string';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = socketIoClient(ENDPOINT);
        setRoom(room);
        setName(name);
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
        
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message ]);
        });

        socket.on('roomData', ({room, users}) => {
            console.log(room, users);
            setUsers(users);
        });
      
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages]);

    const sendMessage = ( event ) => {
        event.preventDefault();
        socket.emit('sendMessage', message, () => setMessage(''));
    };

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input sendMessage={sendMessage} setMessage={setMessage} message={message} />
            </div>
            <div className="textContainer">
                <h1>실시간 채팅앱 💬</h1>
                <h2>Made with Socket.IO ❤️</h2>
                <h2>Try it out right now! ⬅️</h2>
                {
                    users ? <h2>Currently in this room: {users.map(({name}) => <div>{name}</div>)}</h2> : null
                }
            </div>
        </div>
    );
};

export default Chat;