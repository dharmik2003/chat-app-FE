import { ComboboxDemo } from "@/components/common/ComboboxDemo";
import { Button } from "@/components/ui/button";
import { APICall } from "@/utils";
import React, { useEffect, useState } from "react";

interface UserListProps {
  onSuccess: (val: string) => void;
  onClose: () => void;
}

interface User {
  created_at: string;
  email: string;
  id: number;
  name: string;
  password: string;
  user_id: string;
  color: string;
}

const UserList = ({ onSuccess, onClose }: UserListProps) => {
  const [selectedUser, setSelectedUser] = React.useState("");
  const [allUserList, setAllUserList] = React.useState<User[]>([]);

  console.log("allUserList", allUserList);

  const fetchUser = async () => {
    const response = await APICall({
      url: "/api/chat/userlist",
      method: "GET",
    });
    response?.data;
    setAllUserList(response?.data);
  };

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  console.log("userList", userList);

  return (
    <div className="">
      <h3 className="text-xl font-semibold mb-2">Chat with a New User</h3>

      <ComboboxDemo
        options={allUserList.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        value={selectedUser}
        placeholder="Selecta new user"
        searchPlaceholder={"Search a user"}
        notFoundMessage={
          "No user found. Please try searching with different keyword"
        }
        onChange={(val) => {
          setSelectedUser(val);
        }}
        mainClassName="!w-full !relative"
        mainContentClassName="max-w-[250px] w-full"
        triggerMenuCSS="max-h-[250px] left-0"
      />

      <div className="mt-6 gap-2 flex justify-end">
        <Button
          size="sm"
          variant={"outline"}
          onClick={onClose}
          className="bg-white w-[80px] text-black border hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          variant={"default"}
          onClick={() => onSuccess(selectedUser)}
          className="bg-blue-500 w-[80px] text-white hover:bg-blue-600 cursor-pointer"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default UserList;
