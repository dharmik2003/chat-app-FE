import { MoreVertical, Phone, Search, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  user: {
    name: string;
    avatar: string;
    lastSeen?: string;
  };
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{user.name}</h2>
          {user.lastSeen && (
            <p className="text-xs text-gray-500">{user.lastSeen}</p>
          )}
        </div>
      </div>
      {/* <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost">
          <Phone className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <Video className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <Search className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div> */}
    </div>
  );
};

export default ChatHeader;
