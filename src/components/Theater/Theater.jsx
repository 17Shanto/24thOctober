import React, { useState, useEffect, useRef } from "react";
import Peer from "peerjs";

const Theater = () => {
    const [peerId, setPeerId] = useState("");
    const [connectToId, setConnectToId] = useState("");
    const [connected, setConnected] = useState(false);
    const [videoState, setVideoState] = useState({ currentTime: 0, paused: true });
    const [videoSrc, setVideoSrc] = useState(null); // For storing uploaded video URL

    const peerInstance = useRef(null);
    const connectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        // Initialize PeerJS and set up a peer ID
        peerInstance.current = new Peer();

        peerInstance.current.on("open", (id) => {
            setPeerId(id);
            console.log(`My peer ID is: ${id}`);
        });

        // Handle incoming connections
        peerInstance.current.on("connection", (conn) => {
            connectionRef.current = conn;
            setConnected(true);
            setupConnectionHandlers(conn);
            console.log(`Connected to peer: ${conn.peer}`);
        });

        // Cleanup
        return () => {
            peerInstance.current?.destroy();
        };
    }, []);

    const connectToPeer = () => {
        const conn = peerInstance.current.connect(connectToId);
        connectionRef.current = conn;
        setupConnectionHandlers(conn);
        setConnected(true);
        console.log(`Attempting to connect to peer: ${connectToId}`);
    };

    const setupConnectionHandlers = (conn) => {
        conn.on("open", () => {
            console.log(`Connection opened with peer: ${conn.peer}`);
        });

        conn.on("data", (data) => {
            console.log("Received data:", data);
            handleIncomingVideoState(data);
        });

        conn.on("close", () => {
            setConnected(false);
            console.log("Connection closed");
        });
    };

    const handleIncomingVideoState = (data) => {
        if (data.type === "sync") {
            const { currentTime, paused } = data.payload;
            const video = videoRef.current;

            if (Math.abs(video.currentTime - currentTime) > 0.5) {
                video.currentTime = currentTime;
            }
            paused ? video.pause() : video.play();
        }
    };

    const syncVideoState = () => {
        if (!connectionRef.current?.open) return;

        const video = videoRef.current;
        const newState = { currentTime: video.currentTime, paused: video.paused };
        connectionRef.current.send({ type: "sync", payload: newState });
    };

    const onVideoPlay = () => {
        setVideoState((prev) => ({ ...prev, paused: false }));
        syncVideoState();
    };

    const onVideoPause = () => {
        setVideoState((prev) => ({ ...prev, paused: true }));
        syncVideoState();
    };

    const onVideoSeek = () => {
        syncVideoState();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setVideoSrc(fileURL); // Set the video source to the uploaded file's URL
        }
    };

    return (
        <div className="p-5">
            {!connected ? (
                <div className="flex flex-col items-center gap-4">
                    <label>Your Peer ID:</label>
                    <textarea
                        readOnly
                        value={peerId}
                        className="p-2 border rounded w-full max-w-md"
                    />
                    <input
                        type="text"
                        value={connectToId}
                        onChange={(e) => setConnectToId(e.target.value)}
                        placeholder="Enter friend's Peer ID"
                        className="p-2 border rounded w-full max-w-md"
                    />
                    <button
                        onClick={connectToPeer}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Connect
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-lg font-bold mb-4">Connected to Peer</h2>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="mb-4"
                    />
                    {videoSrc ? (
                        <video
                            ref={videoRef}
                            controls
                            className="w-full max-w-lg border rounded shadow-lg"
                            onPlay={onVideoPlay}
                            onPause={onVideoPause}
                            onSeeked={onVideoSeek}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    ) : (
                        <p className="text-gray-500">Upload a video to start playing</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Theater;
