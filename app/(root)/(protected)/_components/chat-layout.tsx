"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-session";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import ImageUpload from "@/components/shared/image-upload";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const socket = io("http://localhost:3001"); // Connect to the backend server

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
    fileUrl: string; // URL or path to the uploaded file
  };
};

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Track selected file
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = useCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input
  const [sentMessageIds, setSentMessageIds] = useState<Set<string>>(new Set());

  // Load messages from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      const parsedMessages: Message[] = JSON.parse(storedMessages);

      // Filter out expired messages (e.g., older than 1 hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString(); // 1 hour ago
      const validMessages = parsedMessages.filter(
        (msg) => new Date(msg.timestamp) > new Date(oneHourAgo)
      );

      setMessages(validMessages);
    }
  }, []);

  // Listen for new messages from the server
  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      if (!sentMessageIds.has(message.id)) {
        setMessages((prev) => [...prev, message]);
        setSentMessageIds((prev) => new Set(prev).add(message.id)); // Add the ID to the set
        saveMessagesToLocalStorage([...messages, message]); // Save updated messages
      }
    });

    return () => {
      socket.off("receiveMessage"); // Clean up the event listener
    };
  }, [sentMessageIds, messages]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to save messages to localStorage
  const saveMessagesToLocalStorage = (updatedMessages: Message[]) => {
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  function handleSend() {
    if (currentMessage.trim() || selectedFile) {
      const newMessage: Message = {
        id: uuidv4(), // Use UUID for unique ID
        text: currentMessage.trim(),
        user: {
          name: currentUser?.name ?? "",
          avatarUrl: currentUser?.image ?? "",
        },
        timestamp: new Date().toISOString(), // Use ISO string for easier comparison
        attachment: selectedFile
          ? {
              fileName: selectedFile.name,
              fileUrl: URL.createObjectURL(selectedFile), // Create a temporary URL for the file
            }
          : undefined,
      };

      // Add the message locally
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setSentMessageIds((prev) => new Set(prev).add(newMessage.id)); // Track the ID

      // Save messages to localStorage
      saveMessagesToLocalStorage(updatedMessages);

      // Send the message to the server
      socket.emit("sendMessage", newMessage);

      // Clear the input field and reset the file state
      setCurrentMessage("");
      setSelectedFile(null);
    }
  }

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
            {/* Message content */}
            <div className="bg-gray-800 text-white rounded p-2 shadow-sm max-w-[100%]">
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

      {/* Input area */}
      <div className="border-t p-4">
        <div className="flex items-center">
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
          {/* Paperclip button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full shadow" variant="outline">
                File upload
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
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
        {/* Display selected file name */}
        {selectedFile && (
          <div className="mt-2 text-sm text-gray-400">
            Attached: {selectedFile.name}
          </div>
        )}
      </div>
    </div>
  );
}