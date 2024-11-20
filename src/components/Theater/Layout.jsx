import React, { useState, useEffect, useRef, useContext } from 'react';
import Peer from 'peerjs';
import { ContextData } from './../ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDove, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theater from './Theater';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Layout = () => {

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

    // Format time as HH:MM
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

            // Show toast notification
            toast.info(`📩 New Message from ${data.userName}: ${data.userText}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            };
            connectionRef.current.send(obMsg);
            setMessages((prevMessages) => [...prevMessages, { sender: 'You', text: obMsg }]);
            setMessage('');  // Clear input field
        }
    };

    return (
        <div className='grid grid-cols-1 gap-3 lg:ml-20 lg:mr-20 lg:mt-10 ml-10 mr-10 mt-5'>
            <ToastContainer /> {/* Toast notification container */}
            <div className="">
                <Theater></Theater>
            </div>
            <div className="flex justify-center">
                <div>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn btn-success font-serif" onClick={() => document.getElementById('my_modal_3').showModal()}><FontAwesomeIcon className='text-white text-xl' icon={faDove} />ChitChat</button>
                    <dialog id="my_modal_3" className="modal display ">

                        <div className="modal-box artboard artboard-demo phone-1 ">
                            <div className="">
                                <h1 className='font-serif font-semibold text-xl text-center'>Tweety Birds <FontAwesomeIcon className='text-success' icon={faTwitter} /></h1>
                            </div>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

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
                                                    placeholder='Paste Your Friend’s Peer ID'
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
                                                                    alt="Avatar"
                                                                    src={msg.text.img} />
                                                            </div>
                                                        </div>
                                                        <div className="chat-header">
                                                            {msg.sender === 'You' ? msg.sender : msg.text.userName} &nbsp;
                                                            <time className="text-xs opacity-50">{msg.text.time}</time>
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


                            {/* <div className="display">
                        <div className="artboard artboard-demo phone-1">
                            <ChatApp></ChatApp>
                        </div>
                    </div> */}

                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default Layout;