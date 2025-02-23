"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Home() {
    const [roomId, setRoomId] = useState("");
    const [joined, setJoined] = useState(false);
    const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);

    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const localStream = useRef<MediaStream | null>(null);

    // Cleanup function to reset RTCPeerConnection and media streams
    const cleanupPeerConnection = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        setRemoteSocketId(null);
    };

    // Initialize local media stream
    const startLocalStream = async () => {
        try {
            localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream.current;
            }
            return localStream.current; // Return the stream so we can use it later
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    };

    // Create a new RTCPeerConnection
    const createPeerConnection = () => {
        const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

        pc.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", { target: remoteSocketId, candidate: event.candidate });
            }
        };

        return pc;
    };

    // Handle user joining the room
    const handleJoinRoom = async () => {
        setJoined(true);
        socket.emit("join-room", roomId);

        peerConnection.current = createPeerConnection();

        const stream = await startLocalStream();
        if (stream) {
            stream.getTracks().forEach((track) => {
                peerConnection.current!.addTrack(track, stream);
            });
        }
    };

    // Handle receiving an offer from another peer
    const handleReceiveOffer = async ({ sender, sdp }: { sender: string; sdp: RTCSessionDescriptionInit }) => {
        setRemoteSocketId(sender);

        if (!peerConnection.current) {
            peerConnection.current = createPeerConnection();
        }

        const stream = await startLocalStream();
        if (stream) {
            stream.getTracks().forEach((track) => {
                peerConnection.current!.addTrack(track, stream);
            });
        }

        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);

        socket.emit("answer", { target: sender, sdp: answer });
    };

    // Handle receiving an answer from another peer
    const handleReceiveAnswer = async ({ sdp }: { sdp: RTCSessionDescriptionInit }) => {
        if (peerConnection.current) {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        }
    };

    // Handle receiving ICE candidates from another peer
    const handleReceiveCandidate = ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection.current) {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch((err) => {
                console.error("Error adding ICE candidate:", err);
            });
        }
    };

    // Handle user disconnection
    const handleUserDisconnected = (id: string) => {
        if (id === remoteSocketId) {
            cleanupPeerConnection();
        }
    };

    // Toggle video on/off
    const toggleVideo = () => {
        if (localStream.current) {
            localStream.current.getVideoTracks().forEach((track) => (track.enabled = !videoEnabled));
            setVideoEnabled(!videoEnabled);
        }
    };

    // Toggle audio on/off and notify the remote peer
    const toggleAudio = () => {
        if (localStream.current) {
            const newAudioState = !audioEnabled;
            localStream.current.getAudioTracks().forEach((track) => (track.enabled = newAudioState));
            setAudioEnabled(newAudioState);

            // Notify the remote peer about the audio state change
            if (remoteSocketId) {
                socket.emit("audio-state-change", { target: remoteSocketId, enabled: newAudioState });
            }
        }
    };

    // Handle receiving an audio state change from the remote peer
    const handleAudioStateChange = ({ enabled }: { enabled: boolean }) => {
        if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
            const remoteStream = remoteVideoRef.current.srcObject as MediaStream;
            remoteStream.getAudioTracks().forEach((track) => (track.enabled = enabled));
        }
    };

    useEffect(() => {
        socket.on("user-joined", async (id: string) => {
            setRemoteSocketId(id);

            if (!peerConnection.current) {
                peerConnection.current = createPeerConnection();
            }

            const stream = await startLocalStream();
            if (stream) {
                stream.getTracks().forEach((track) => {
                    peerConnection.current!.addTrack(track, stream);
                });
            }

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit("offer", { target: id, sender: socket.id, sdp: offer });
        });

        socket.on("offer", handleReceiveOffer);
        socket.on("answer", handleReceiveAnswer);
        socket.on("ice-candidate", handleReceiveCandidate);
        socket.on("user-disconnected", handleUserDisconnected);

        // Listen for audio state changes
        socket.on("audio-state-change", handleAudioStateChange);

        return () => {
            socket.off("user-joined");
            socket.off("offer");
            socket.off("answer");
            socket.off("ice-candidate");
            socket.off("user-disconnected");
            socket.off("audio-state-change");
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-6">WebRTC Video Chat</h1>
            {!joined ? (
                <div className="mt-5 flex flex-col items-center">
                    <input className="p-3 text-black rounded-md w-64 dark:text-white" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                    <button className="mt-4 p-3 bg-blue-600 rounded-md hover:bg-blue-700 transition" onClick={handleJoinRoom}>
                        Join
                    </button>
                </div>
            ) : (
                <div className="mt-5 flex flex-col items-center">
                    <div className="grid grid-cols-2 gap-6 p-4 bg-gray-700 rounded-lg">
                        <video ref={localVideoRef} autoPlay playsInline muted className="w-72 h-56 bg-black rounded-lg shadow-lg border-2 border-blue-500" />
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-72 h-56 bg-black rounded-lg shadow-lg border-2 border-green-500" />
                    </div>
                    <div className="mt-5 flex gap-4">
                        <button className="p-3 bg-red-500 rounded-md hover:bg-red-600 transition" onClick={toggleVideo}>
                            {videoEnabled ? "Stop Video" : "Resume Video"}
                        </button>
                        <button className="p-3 bg-green-500 rounded-md hover:bg-green-600 transition" onClick={toggleAudio}>
                            {audioEnabled ? "Mute" : "Unmute"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
