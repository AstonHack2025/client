"use client";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

const socket = io("http://localhost:3001"); // Connect to backend WebSocket server

function App() {
    const [code, setCode] = useState<string>("// Start coding...");
    const [language, setLanguage] = useState<string>("javascript");

    useEffect(() => {
        // Load initial code when connected
        socket.on("load-code", (initialCode: string) => {
            setCode(initialCode);
        });

        // Listen for real-time code updates from other users
        socket.on("code-change", (newCode: string) => {
            setCode(newCode);
        });

        return () => {
            socket.off("load-code");
            socket.off("code-change");
        };
    }, []);

    // Handle code changes and send updates to the server
    const handleCodeChange = (newCode: string | undefined) => {
        if (newCode !== undefined) {
            setCode(newCode);
            socket.emit("code-change", newCode);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Dropdown for selecting language */}
            <select
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                style={{
                    padding: "8px",
                    fontSize: "16px",
                    marginBottom: "10px",
                    alignSelf: "center",
                }}
            >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="typescript">TypeScript</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
            </select>

            {/* Monaco Editor with real-time collaboration */}
            <Editor
                height="90vh"
                theme="vs-dark" // Dark mode
                language={language}
                value={code}
                onChange={handleCodeChange} // Sync changes via Socket.IO
            />
        </div>
    );
}

export default App;
