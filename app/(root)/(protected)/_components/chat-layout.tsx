"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
// Import your hook to get current user info. Adjust the path as needed.
import { useCurrentUser } from "@/hooks/use-session";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();

  function handleSend() {
    if (currentMessage.trim() && currentUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: currentMessage.trim(),
        user: {
          name: currentUser.name,
          avatarUrl: currentUser.avatarUrl,
        },
      };
      setMessages((prev) => [...prev, newMessage]);
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