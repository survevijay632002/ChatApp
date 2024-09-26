// import express from "express";
// import { Server } from "socket.io";
// import path from "path";
// import http from "http";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// const Port = 9090;

// app.use(express.static(path.resolve("./public")));
// app.use(express.json());

// io.on("connection", (socket) => {
//   console.log("connected socket");

//   socket.on("User-message", (message) => {
//     console.log(message);
//     io.emit("message", message);
//   });
// });

// app.get("/", (req, res) => {
//   return res.sendFile("./public/index.html");
// });

// server.listen(Port, () => {
//   console.log(`Port is Running on ${Port}`);
// });

// import express from "express";
// import http from "http";
// import path from "path";
// import os from "node:os";
// import fs from "node:fs";
// import status from "express-status-monitor";
// import { Server } from "socket.io"; //step 1 install  and the import server from socket.io
// import cors from "cors";

// const app = express();
// app.use(express.json());
// // app.use(express.static(path.resolve("./public")));
// app.use(status());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173/",
//     credentials: true,
//     methods: ["POST", "GET"],
//   },
// });
// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     credentials: true,
//     methods: ["POST", "GET"],
//   })
// );

// // handling socket ...

// io.on("connection", (socket) => {
//   //io means entire server send
//   console.log(`User connected `);
//   console.log(`Id ${socket.id}`);

//   socket.on("User-message", (message) => {
//     // socket means
//     console.log(message);
//     io.emit("message", `user_id ${socket.id} \n message: ${message}`);
//   });
// });

// app.get("/", (req, res) => {
//   return res.sendFile("./public/index.html");
// });

// const CupNum = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < CupNum; i++) {
//     cluster.fork();
//   }
// } else {
server.listen(9000, () => {
  console.log(`sever is running on 9000`);
});
// }
//these Create By using WebsocketServer is a comunication.... protocol
// import express from "express";
// import { WebSocketServer } from "ws";

// const app = express();
// const Port = 8080;

// app.get("/", (req, res) => {
//   res.send("succed fully run okkk");
// });

// const server = app.listen(Port, () => console.log(`server running on ${Port}`));

// const wss = new WebSocketServer({ server }); //these create for both server and websocket  run on the same port..

// wss.on("connection", (ws) => {
//   console.log("connected");
//   ws.on("message ", (data) => {
//     console.log("data form from client %s:", data);
//     ws.send("thank buddy");
//   });
//});
