import React, { useState } from "react";
import ChatSidebar from "./Sidebar";
import { Chat } from "./Chat";

const DashboardSection = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: "2",
    name: "Mark Appleseed",
    avatar: "/placeholder.svg?height=40&width=40",
    lastSeen: "Online",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <ChatSidebar
        onSelectUser={setSelectedUser}
        selectedUserId={selectedUser.id}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main
        className={`
        flex-grow 
        transition-all 
        duration-300 
        ease-in-out 
        ${isSidebarOpen ? "ml-80" : "ml-16"}
      `}
      >
        <Chat user={selectedUser} />
      </main>
    </div>
  );
};

export default DashboardSection;
