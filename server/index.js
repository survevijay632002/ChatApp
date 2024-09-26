import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = 8080;

// Middleware for CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);


let activeUsers = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

 
  activeUsers.push(socket.id);
  io.emit("User_Connected", activeUsers);

 
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("message", ({ message, room }) => {
    if (room) {
      
      
      socket.to(room).emit("receive_message", { message, sender: socket.id });
      console.log(`Message sent to room ${room}: ${message}`);
    } else {
      // If no room is provided, broadcast to all users except sender
      socket.broadcast.emit("receive_message", { message, sender: socket.id });
      console.log(`Message broadcasted: ${message}`);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
 
    activeUsers = activeUsers.filter((id) => id !== socket.id);

    io.emit("User_Connected", activeUsers); 
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
