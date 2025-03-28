import type React from "react";

import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatSectionProps {
  user: {
    name: string;
    avatar: string;
  };
}

export function ChatSection({ user }: ChatSectionProps) {
  const [message, setMessage] = useState("");

  // Mock conversation data
  const conversation = [
    {
      id: "1",
      sender: "them",
      message: "Yes. Should we move it to next week?",
      time: "9:30 AM",
    },
    {
      id: "2",
      sender: "me",
      message: "Sure, whatever suits you 😊",
      time: "9:32 AM",
    },
    {
      id: "3",
      sender: "them",
      message: "And I'll update the calendar. I thought I already updated it.",
      time: "9:35 AM",
    },
    {
      id: "4",
      sender: "me",
      message: "It's all good fam.",
      time: "9:36 AM",
    },
    {
      id: "5",
      sender: "them",
      message:
        "I was thinking to do every first Wednesday in the month. But we can do it next week whenever you want?",
      time: "9:40 AM",
    },
    {
      id: "6",
      sender: "me",
      message: "Cool tho. 👍 Next Thursday at about 10:30?",
      time: "9:42 AM",
    },
    {
      id: "7",
      sender: "them",
      message: "OK, I'll let you know.",
      time: "9:45 AM",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-gray-50 overflow-y-auto">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "them" && (
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p>{msg.message}</p>
                <p className="mt-1 text-right text-xs opacity-70">{msg.time}</p>
              </div>
              {msg.sender === "me" && (
                <Avatar className="ml-2 h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Me"
                  />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-gray-500"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message"
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
