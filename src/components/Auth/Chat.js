import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from "jwt-decode";

const socket = io(process.env.REACT_APP_API_URL);

export function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userName = localStorage.getItem('userName') || 'Анонім';

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/chat/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error("Помилка завантаження повідомлень:", err));
        socket.on('chatMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() && socket.connected) {
            const messageData = { sender: userName, text: newMessage };
            socket.emit('chatMessage', messageData);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h3>Повідомлення:</h3>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Введіть повідомлення..."
            />
            <button onClick={sendMessage}>Відправити</button>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px' }}>
                <ol>
                    {messages.map((msg, index) => (
                        <li
                            key={index}>
                            <strong>{msg.sender}:</strong> {msg.text}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}


export function ChatButton() {
    const navigate = useNavigate();

    const handleOpenChat = () => {
        navigate(`/open-chat`)
    }

    return (
        <div style={{
            textAlign: 'center',
            marginTop: '20px'
        }}>
            <button
                onClick={handleOpenChat}
                style={{
                    padding: '10px 20px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Відкрити чат
            </button>
        </div>
    )
}

export function UserInfo() {
    const token = localStorage.getItem('authToken')
    let userName = '';
    if (token) {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        userName = decodedToken.name
    }
    return (
        <div>
            {userName ? <h3>Вітаємо, {userName}</h3> : <p>Ви не авторизовані.</p>}
        </div>
    )
}