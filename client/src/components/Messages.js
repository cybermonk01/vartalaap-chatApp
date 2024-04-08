import React from "react";

const Messages = ({ message, own }) => {
  const messageTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`message ${own ? "own" : ""}`}>
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
          className={`bg-gray-200 px-4 py-2 rounded-lg text-gray-800 ${
            own ? "ml-4" : "mr-4"
          }`}
        >
          {message.text}
        </p>
      </div>
      <div
        className={`messageBottom text-xs text-gray-500 ${
          own ? "text-right" : ""
        }`}
      >
        {messageTime}
      </div>
    </div>
  );
};

export default Messages;
