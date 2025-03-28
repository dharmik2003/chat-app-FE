import React, { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import SidebarHeader from "./SidebarHeader";
import SidebarUserList from "./SidebarUserList";
import { Button } from "@/components/ui/button";
import UserList from "./UserList";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/common/Model";

interface SidebarProps {
  onSelectUser: (user: any) => void;
  selectedUserId: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const ChatSidebar = ({
  onSelectUser,
  selectedUserId,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div
      className={`
        fixed 
        top-0 
        left-0 
        h-full 
        transition-all 
        duration-300 
        ease-in-out 
        ${isSidebarOpen ? "w-80" : "w-16"} 
        bg-white 
        border-r 
        shadow-lg 
        z-10 
        flex 
        flex-col
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          `
          absolute 
          top-2 
          right-4 
          z-20 
          p-1 
          rounded-full 
          cursor-pointer
          hover:bg-gray-200 
          transition
        `,
          isSidebarOpen && "text-white hover:text-black"
        )}
      >
        {isSidebarOpen ? <X size={24} className="" /> : <Menu size={24} />}
      </button>

      <div
        className={`transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0"
        } ${isSidebarOpen ? "visible" : "invisible"} flex flex-col h-full`}
      >
        <div className="flex-shrink-0">
          <SidebarHeader />
        </div>

        <div
          className="flex-grow overflow-y-auto px-4 py-2"
          style={{
            maxHeight: "calc(100% - 80px)",
          }}
        >
          <SidebarUserList
            onSelectUser={onSelectUser}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>

      <div className="flex-shrink-0 p-4">
        <Button
          size="icon"
          variant="ghost"
          className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white cursor-pointer border-none"
          onClick={toggleModal}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal} className="h-[180px]">
          <UserList
            onClose={() => setIsModalOpen(false)}
            onSuccess={(val) => {
              setIsModalOpen(false);
              setSelectedUser(val);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChatSidebar;
