import {createServer} from 'http';
import express from 'express';
import {Server} from 'socket.io';

const app=express();
const httpServer=createServer(app);

const io=new Server(httpServer, {
  cors: {
     origin: 'http://localhost:5173',
     credentials: true
  },
})

const onlineUsers = {}

export function getReceiverSocketId(userId){
  return onlineUsers[userId]
}

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id)
  const userId = socket.handshake.query.userId
  if(userId){
  onlineUsers[userId]=socket.id;
  io.emit("getOnlineUsers", Object.keys(onlineUsers))


  }
  

  socket.on("disconnect", () => {
    console.log("Socket User Disconnect", socket.id);
    delete onlineUsers[userId]
  })
})



httpServer.listen(process.env.PORT)

export {app, io}