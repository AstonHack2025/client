"use client";
import { Navbar } from "@/components/shared/navbar";
import ChatLayout from "../_components/chat-layout";
import { useState, useEffect } from "react";

export default function Chat() {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        setData(storedData);
        localStorage.removeItem("data");
    }, []); // Runs only on the client after initial render

    const roomId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("roomId") : null;

    return (
        <div className="h-screen">
            <Navbar />
            <ChatLayout data={data} roomId={roomId} />
        </div>
    );
}
