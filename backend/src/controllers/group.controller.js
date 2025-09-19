import { GroupChat } from "../models/message.model.js"
import { Group } from "../models/group.model.js"
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Socket } from "socket.io";
import { uploadImage } from "../lib/utils.js";



export const getGroups = async (req, res) => {
  const groups = await Group.find({ users: req.user._id });
  return res.status(200).json(groups)
}

export const createGroup = async (req, res) => {
  const user = req.user;
  const {title} = req.body

  const group = new Group({
    users: [user._id],
    admin: user._id,
    title: title,
  })

  const newGroup = await group.save()
  res.status(201).json(newGroup)
}


export const addUser = async (req, res) => {
  const {groupId} = req.params
  const {users} = req.body
  const group = await Group.findById(groupId);
  
  if(!group.admin.equals(req.user._id)){
    return res.status(400).json({message: "Only Admin can add users in groups", admin: group.admin, user: req.user._id})
  }
  const result  = await Group.findByIdAndUpdate(
  groupId,
  {
    $addToSet: { users: { $each: users } }
  },
  { new: true }
);

res.status(201).json(result)
}

export const sendMessage = async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.user._id;
  const {text, image} = req.body;
    let imageUrl;
    if(image){
     imageUrl = await uploadImage(image)
    }

  const groupMessage = await GroupChat.create({
    groupId,
    senderId: userId,
    text,
    image: imageUrl
  })
console.log(groupMessage);


// const newGroupMessage = await groupMessage.save()
(async () => {
  const socketId = getReceiverSocketId(userId)

    io.to(`chatroom-${groupId}`).except(socketId).emit("group-chat-received", groupMessage)

  
})()
  
return res.status(201).json(groupMessage)
}

export const getMessages = async (req, res) => {
  const groupId = req.params.groupId;
  // const 
  const messages = await GroupChat.find({groupId});
  return res.status(200).send(messages)
}