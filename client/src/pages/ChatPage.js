import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "../components/ChatOnline";
import Conversations from "../components/Conversations";
import Messages from "../components/Messages";
import axiosReq from "../utils/axios";
import { io } from "socket.io-client";

const Chatpage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getOnlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosReq.get("/conversations/" + user?._id);
        setConversations(res.data.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosReq.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axiosReq.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen ">
      <div className="w-1/3 border-r bg-blue-50">
        <div className="bg-gray-200 p-4">
          <input
            type="text"
            placeholder="Search People"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {conversations.map((c, index) => (
            <div key={index} onClick={() => setCurrentChat(c)}>
              <Conversations conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 ">
        {currentChat ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto bg-gray-100">
              {messages.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <Messages message={m} own={m.sender === user._id} />
                </div>
              ))}
            </div>
            <div className="bg-gray-200 p-2 flex items-center">
              <textarea
                placeholder="Type a message..."
                className="flex-grow resize-none mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <span className="flex items-center justify-center h-full">
            Open a conversation to start a chat
          </span>
        )}
      </div>

      <div className="w-1/3 border-l">
        <ChatOnline onlineUsers={onlineUsers} />
      </div>
    </div>
  );
};

export default Chatpage;
