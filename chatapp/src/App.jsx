import React, { useMemo, useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:8080/"), []);
  const [sendMessage, setSendMessage] = useState(""); // Message to send
  const [messages, setMessages] = useState([]); // Store both sent and received messages
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [activeUsers, setActiveUsers] = useState([]); // Store active user IDs
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = { message: sendMessage, room, sender: "me" }; // Mark message as "me"
    setMessages((prevMessages) => [...prevMessages, messageData]); // Add the sent message to the state
    socket.emit("message", { message: sendMessage, room }); // Emit message to server
    setSendMessage(""); // Clear input field after sending
  };

  // Listen for events from the server
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected client", socket.id);
      setSocketId(socket.id);
    });

    // Update active users list when a new user connects
    socket.on("User_Connected", (activeUserList) => {
      setActiveUsers(activeUserList); // Update the entire active user list from the server
    });

    // Remove disconnected users from the active list
    socket.on("User_Disconnected", (activeUserList) => {
      setActiveUsers(activeUserList); // Update the list upon user disconnection
    });

    // Listen for incoming messages from other users
    socket.on("receive_message", (data) => {
      const messageData = { message: data.message, sender: data.sender }; // Mark message as received with sender
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add received message to state
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="relative flex min-h-screen">
      {/* Toggle button for the sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isSidebarOpen ? "Close Users" : "Show Users"}
      </button>

      {/* Sidebar for Active Users */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-200 p-4 shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <h2 className="font-bold mb-4">Active Users</h2>
        <ul className="space-y-2">
          {activeUsers.length > 0 ? (
            activeUsers.map((userId, index) => (
              <li key={index} className="p-2 bg-white rounded shadow">
                {userId}
              </li>
            ))
          ) : (
            <li>No active users</li>
          )}
        </ul>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-grow flex flex-col justify-center items-center ml-16">
        <div className="text-3xl text-slate-800">Live Chat App</div>
        <div>Id: {socketId}</div>
        <div className="pb-6 w-full max-w-md">
          <div className="container h-[500px] w-full border border-black rounded-md overflow-auto p-4 bg-gray-100">
            <div className="space-y-3">
              {/* both sent and received messages */}
              {messages.map((messageData, index) => (
                <div
                  key={index}
                  className={`flex ${
                    messageData.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                > 
                  <div
                    className={`${
                      messageData.sender === "me"
                        ? "bg-green-300"
                        : "bg-white border border-gray-300"
                    } text-black p-2 rounded-xl max-w-xs break-words`}
                  >
                    <p>{messageData.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Message"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              className="flex-grow bg-yellow-50 border px-4 rounded"
            />

            <input
              type="text"
              placeholder="Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="flex-grow bg-yellow-50 border px-4 rounded"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white active:bg-blue-400 pt-1 px-4 pb-1 rounded"
            >

              Send
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
