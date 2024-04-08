import React, { useEffect, useState } from "react";
import axiosReq from "../utils/axios";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  console.log(conversation);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axiosReq.get("/user/single/?userId=" + friendId);
        console.log("users", res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center p-4 border-b border-gray-200">
          <img
            src={user?.pic}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p>{}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
