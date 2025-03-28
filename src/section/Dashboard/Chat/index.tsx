"use client";

import ChatHeader from "./ChatHeader";
import { ChatSection } from "./ChatSection";

interface ChatProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    lastSeen?: string;
  };
}

export function Chat({ user }: ChatProps) {
  return (
    <div className="flex flex-1 flex-col h-full">
      <ChatHeader user={user} />
      <ChatSection user={user} />
    </div>
  );
}
