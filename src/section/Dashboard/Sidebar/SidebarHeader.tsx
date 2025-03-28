import React from "react";

const SidebarHeader = () => {
  return (
    <div className="flex h-14 items-center justify-between border-b bg-blue-500 px-4 text-white">
      <div className="flex items-center gap-2">
        <h2 className="font-medium">Chat App</h2>
      </div>
    </div>
  );
};

export default SidebarHeader;
