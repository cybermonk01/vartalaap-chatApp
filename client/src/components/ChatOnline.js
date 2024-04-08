import React from "react";
import { useSelector } from "react-redux";

const ChatOnline = ({ onlineUsers }) => {
  console.log("oooooooooooo", onlineUsers);
  const User = useSelector((store) => store.auth.user);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Search Online Users"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-100 p-4">
          <p className="font-semibold">Online</p>
          {onlineUsers.map((user) => (
            <div key={user.userId} className="flex items-center mt-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  user.online ? "bg-red-500" : "bg-green-600"
                } mr-2`}
              ></div>
              <p>{User.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatOnline;
