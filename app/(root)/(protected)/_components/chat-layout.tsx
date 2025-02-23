"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-session";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import ImageUpload from "@/components/shared/image-upload";
import { Button } from "@/components/ui/button";
import { useSyncDemo } from "@tldraw/sync";
import Editor from "@monaco-editor/react";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

const socket = io("http://localhost:3001");

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  attachment?: {
    fileName: string;
    fileUrl: string;
  };
};

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [users, setUsers] = useState<{ name: string; avatarUrl: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sentMessageIds, setSentMessageIds] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState<"chat" | "whiteboard" | "codeeditor">("chat");
  const store = useSyncDemo({ roomId: "myapp-abc123" });

  // Listen for messages
  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      if (!sentMessageIds.has(message.id)) {
        setMessages((prev) => [...prev, message]);
        setSentMessageIds((prev) => new Set(prev).add(message.id));
      }
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [sentMessageIds]);

  // Listen for user list
  useEffect(() => {
    socket.on("userList", (userList: { name: string; avatarUrl: string }[]) => {
      console.log("Received user list:", userList); // Debug log
      setUsers(userList);
    });

    return () => {
      socket.off("userList");
    };
  }, []);

  function handleSend() {
    if (currentMessage.trim() || selectedFile) {

      const newMessage: Message = {
        id: uuidv4(),
        text: currentMessage.trim(),
        user: {
          name: currentUser?.name ?? "",
          avatarUrl: currentUser?.image ?? "",
        },
        timestamp: new Date().toLocaleString(),
        attachment: selectedFile
          ? {
            fileName: selectedFile.name,
            fileUrl: URL.createObjectURL(selectedFile),
          }
          : undefined,
      };
      setMessages((prev) => [...prev, newMessage]);
      setSentMessageIds((prev) => new Set(prev).add(newMessage.id));
      socket.emit("sendMessage", newMessage);
      setCurrentMessage("");
      setSelectedFile(null);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
    }
  };

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
  
  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
        setCode(newCode);
        socket.emit("code-change", newCode);
    }
};

  return (
    <div className="h-[90%] flex">
      <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 border-r flex flex-col h-full shadow-md dark:border-gray-700">
        {/* Users section */}
        <div>
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white">
            Users in Chat
          </h2>
          <ul className="max-h-48 overflow-y-auto mb-4">
            {users.map((user, index) => (
              <li key={index} className="flex items-center space-x-2 mb-1">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-black dark:text-white">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full flex justify-center space-x-1"
            onClick={() => setActiveView("chat")}
          >
            <p>Open Chat</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          <Button
            className="w-full flex justify-center space-x-1"
            onClick={() => setActiveView("whiteboard")}
          >
            <p>Open Whiteboard</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          <Button className="w-full flex justify-center space-x-1" onClick={() => setActiveView("codeeditor")}>
            <p>Open Code Editor</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </Button>
          <Button className="w-full flex justify-center space-x-1">
            <p>Start Video Call</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </Button>
        </div>
      </div>

      {activeView === "whiteboard" && (
        <div className="flex-1 flex flex-col">
          <Tldraw store={store} />
        </div>
      )}

      {activeView === "chat" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={message.user.avatarUrl}
                    alt={message.user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-bold dark:text-white">
                    {message.user.name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {message.timestamp}
                  </span>
                </div>
                <div className="dark:bg-gray-800 dark:text-white rounded p-2 shadow-sm max-w-[100%]">
                  {message.text && <p>{message.text}</p>}
                  {message.attachment && (
                    <div className="mt-2">
                      <a
                        href={message.attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {message.attachment.fileName}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t bg-white dark:bg-gray-800 p-4">
            <div className="flex">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full shadow" variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Upload your files
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      The only file upload you will ever need
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <ImageUpload />
                  </div>
                </DialogContent>
              </Dialog>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
              <Button
                className="rounded-full shadow"
                onClick={handleSend}
                variant="default"

              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </Button>
            </div>
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-400">
                Attached: {selectedFile.name}
              </div>
            )}
          </div>
        </div>





      )}


      {activeView === "codeeditor" && (
        <div className="flex-1 flex flex-col">
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
      )}
    </div>
  );
}
