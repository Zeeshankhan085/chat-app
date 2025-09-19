import { getReceiverSocketId, io } from "../lib/socket.js"
import { uploadImage } from "../lib/utils.js"
import {Message} from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSideBar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password")
    return res.status(200).json(users)

  } catch (error) {
    console.log("Error in sidebar users controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" })
  }
}


export const getMessagesWithUser = async (req, res) => {
  try {
    const { userId  } = req.params;
    
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id , receiverId: userId },
        { senderId: userId, receiverId: req.user._id  }
      ]
    }).sort({ createdAt: 1 })
    
    return res.status(200).json(messages)
  } catch (error) {
    console.log("Error in user messages controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {userId} = req.params;
  const {text, image} = req.body;
  let imageUrl;
  if(image){
   imageUrl = await uploadImage(image)
  }
  const message = new Message({
    text,
    image: imageUrl,
    senderId: req.user._id,
    receiverId: userId
  })
  await message.save()
  const receiverSocketId = getReceiverSocketId(userId);
  if(receiverSocketId){
    io.to(receiverSocketId).emit("message", message)
  }
  return res.status(201).json(message)
  } catch(error){
    console.log("Error in user send message controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" })
  }

}