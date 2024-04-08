import React from "react";

const Messages = ({ message, own }) => {
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message ${own ? "p-4" : "p-4"}`}>
      <div
        className={`flex items-start messageTop ${own ? "justify-end" : ""}`}
      >
        {!own && (
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        )}
        <p
          className={`px-4 py-2 rounded-lg text-gray-800 ${
            own
              ? "ml-4 bg-green-600 text-white "
              : "mr-4 bg-blue-700 text-white"
          }`}
        >
          {message.text}
        </p>
      </div>
      <div
        className={`messageBottom text-xs text-gray-500 ${
          own ? "text-right" : "text-left ml-20"
        }`}
      >
        {messageTime}
      </div>
    </div>
  );
};

export default Messages;
