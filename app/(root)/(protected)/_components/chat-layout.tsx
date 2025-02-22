"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-session";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const socket = io("http://localhost:3001"); // Connect to the backend server

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
};

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();

  // Track sent message IDs to avoid duplicates
  const [sentMessageIds, setSentMessageIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Listen for new messages from the server
    socket.on("receiveMessage", (message: Message) => {
      // Check if the message ID is already in the sentMessageIds set
      if (!sentMessageIds.has(message.id)) {
        setMessages((prev) => [...prev, message]);
        setSentMessageIds((prev) => new Set(prev).add(message.id)); // Add the ID to the set
      }
    });
    return () => {
      socket.off("receiveMessage"); // Clean up the event listener
    };
  }, [sentMessageIds]);

  function handleSend() {
    if (currentMessage.trim() && currentUser) {
      const newMessage: Message = {
        id: uuidv4(), // Use UUID for unique ID
        text: currentMessage.trim(),
        user: {
          name: currentUser.name ?? "",
          avatarUrl: currentUser.image ?? "",
        },
        timestamp: new Date().toLocaleString(),
      };

      // Add the message locally
      setMessages((prev) => [...prev, newMessage]);
      setSentMessageIds((prev) => new Set(prev).add(newMessage.id)); // Track the ID

      // Send the message to the server
      socket.emit("sendMessage", newMessage);
      // Clear the input field
      setCurrentMessage("");
    }
  }

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {/* Display user avatar and name */}
            <div className="flex items-center space-x-2 mb-1">
              <img
                src={message.user.avatarUrl}
                alt={message.user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-bold text-white">{message.user.name}</span>
              <span className="text-gray-400 text-xs">
                {message.timestamp}
              </span>
            </div>
            {/* Message content */}
            <div className="bg-gray-800 text-white rounded p-2 shadow-sm max-w-[100%]">
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input area */}
      <div className="border-t p-4">
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
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}