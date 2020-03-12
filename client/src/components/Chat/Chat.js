import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Message from '../Message/Message';

const socket = io('localhost:5000');

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('enter', (welcomeMessage) => {
            console.log(welcomeMessage);
        });

        socket.on('receiveMessage', (message) => {
            console.log('receiveMessage', message);
            setMessages([...messages], message);
        });

        return () => {
            socket.off('receiveMessage');
        }
    }, [messages]);

    const sendMessage = ( event ) => {
        event.preventDefault();
        socket.emit('sendMessage', message, () => {
            console.log('Message is sended well!');
        });
        setMessage('');
    };

    const handleChange = ({ target: { value } }) => {
        setMessage(value);
    };

    return(
        <>
            <div className="container">
                <div className="rectangle">
                <div className="messages">
                    <h1>Messages</h1>
                    {messages.map((message, i) => <Message key={i} message={message} />)}
                </div>
        
                <form className="form">
                    <input class="input is-large" id="commonSearchTerm" type="text" placeholder="Message" value={message} onChange={handleChange} />
                    <button class="button is-light" id="searchButton" type="submit" onClick={sendMessage}>Send</button>
                </form>
                </div>
            </div>
        </>
    );
};

export default Chat;