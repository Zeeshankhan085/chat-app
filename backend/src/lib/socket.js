import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}
const typingMap = {}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    if(socket.id in typingMap){
      io.to(getReceiverSocketId(typingMap[socket.id])).emit("close-typing")
      delete typingMap[socket.id]
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  socket.on("typing", (recepientId) => {
    console.log(socket, recepientId, "typing------------------");
    typingMap[socket.id] = recepientId
    const to = getReceiverSocketId(recepientId);
    io.to(to).emit("user-typing")
  })
  socket.on("close-typing", (recepientId) => {
    console.log(socket, recepientId, "stopped typing------------------");
    // typingMap[socket.id] = recepientId
    let to;
    if(recepientId){
    to = getReceiverSocketId(recepientId);
    } else {
      to = typingMap[socket.id]
    }
    delete typingMap[socket.id]
    io.to(to).emit("stopped-typing")
  })
});

export { io, app, server };