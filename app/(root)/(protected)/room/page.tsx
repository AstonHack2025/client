"use client";
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useCurrentUser } from "@/hooks/use-session";

export default function Page(roomId: string) {
    const user = useCurrentUser();
    const room = roomId;
    const name = `${user?.name} - ${user?.email}`;
    const [token, setToken] = useState("");

    useEffect(() => {
        (async () => {
            try {
                // Request camera and microphone permissions
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

                // Fetch the token after permissions are granted
                const resp = await fetch(`/api/token?room=${room}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch (e) {
                console.error("Failed to get media permissions or token:", e);
            }
        })();
    }, []);

    if (token === "") {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-blue-500"></div>
                    <p className="text-gray-600">Getting token...</p>
                </div>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.LIVEKIT_URL}
            connectOptions={{
                autoSubscribe: true,
            }}
            data-lk-theme="default"
            style={{ height: "100dvh" }}
        >
            <MyVideoConference />
            <RoomAudioRenderer />
            <ControlBar />
        </LiveKitRoom>
    );
}

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    return (
        <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
            <ParticipantTile />
        </GridLayout>
    );
}
