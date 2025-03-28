import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { userData } from "@/data/userData";
interface SidebarUserListProps {
  onSelectUser: (user: any) => void;
  selectedUserId: string;
}

const SidebarUserList = ({
  onSelectUser,
  selectedUserId,
}: SidebarUserListProps) => {

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-0.5 py-2">
        {userData.map((user) => (
          <div
            key={user.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-100",
              selectedUserId === user.id && "bg-gray-100"
            )}
            onClick={() => onSelectUser(user)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="truncate font-medium">{user.name}</p>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
              <p className="truncate text-sm text-gray-500">{user.message}</p>
            </div>
            {user.unread && (
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarUserList;
