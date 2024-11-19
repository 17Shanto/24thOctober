import React, { useState, useEffect, useRef, useContext } from 'react';
import Peer from 'peerjs';
import { ContextData } from './../ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const ChatApp = () => {
    const [peerId, setPeerId] = useState('');
    const [connectToId, setConnectToId] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const { user } = useContext(ContextData);

    const peerInstance = useRef(null);
    const connectionRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);


    // Real Time
    const [time, setTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Format time as HH:MM    (Ignoring second)
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


    useEffect(() => {
        // Initialize PeerJS and set up a peer ID
        peerInstance.current = new Peer();

        peerInstance.current.on('open', (id) => {
            setPeerId(id);
            console.log(`My peer ID is: ${id}`);
        });

        // Handle incoming connections
        peerInstance.current.on('connection', (conn) => {
            connectionRef.current = conn;
            setConnected(true);
            setupConnectionHandlers(conn);
            console.log(`Connected to peer: ${conn.peer}`);
        });

        // Clean up on component unmount
        return () => {
            peerInstance.current.destroy();
        };
    }, []);

    // Connect to another peer
    const connectToPeer = () => {
        const conn = peerInstance.current.connect(connectToId);
        connectionRef.current = conn;
        setupConnectionHandlers(conn);
        setConnected(true);
        console.log(`Attempting to connect to peer: ${connectToId}`);
    };

    // Set up event handlers for the peer connection
    const setupConnectionHandlers = (conn) => {
        conn.on('open', () => {
            console.log(`Connection opened with peer: ${conn.peer}`);
        });

        conn.on('data', (data) => {
            setMessages((prevMessages) => [...prevMessages, { sender: 'Friend', text: data }]);
        });

        conn.on('close', () => {
            setConnected(false);
            console.log('Connection closed');
        });
    };

    // Send a message
    const sendMessage = () => {
        if (message && connectionRef.current && connectionRef.current.open) {
            const obMsg = {
                userName: user.displayName,
                userText: message,
                time: formattedTime,
                img: user.photoURL

            }
            connectionRef.current.send(obMsg);
            setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: obMsg }]);
            setMessage('');  // Clear input field
        }
    };




    return (
        <div className="App">
            {
                !connected ? (
                    <div className="">

                        <div className='flex flex-col items-center gap-3'>
                            <label>Your Peer ID: </label>
                            <input className="input input-bordered input-primary w-full max-w-xs" type="text" value={peerId} readOnly />

                            <input
                                type="text"
                                value={connectToId}
                                onChange={(e) => setConnectToId(e.target.value)}
                                className="input input-bordered input-primary w-full max-w-xs"
                                placeholder='Paste Here Your Frinds Peer ID'
                            />
                            <button className='btn btn-success font-serif' onClick={connectToPeer} disabled={connected}>Connect</button>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div ref={chatContainerRef} className="overflow-y-auto hide-scrollbar box-border w-64 h-96">

                            {messages.map((msg, index) => (
                                <div key={index} className={msg.sender === 'You' ? 'chat chat-end' : 'chat chat-start'}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS chat bubble component"
                                                src={msg.text.img} />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {msg.sender === 'You' ? msg.sender : msg.text.userName} &nbsp;
                                        <time className="text-xs opacity-50">{msg.text.time} ago</time>
                                    </div>
                                    <div className="chat-bubble">{msg.text.userText}</div>
                                    {msg.sender === 'You' ? <div className="chat-footer opacity-50">Seen</div> : <div className="chat-footer opacity-50">Delivered</div>}
                                </div>
                            ))}
                        </div>
                        <div className="input-box flex justify-center gap-2">
                            <input
                                className='input input-bordered input-info w-full max-w-xs'
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                disabled={!connected}
                            />
                            <button onClick={sendMessage} disabled={!connected}><FontAwesomeIcon className='text-2xl text-success' icon={faPaperPlane} /></button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ChatApp;

