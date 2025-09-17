import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
    receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String
  }
},
{timestamps: true}
)


const GroupChatSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupId: {
     type: mongoose.Types.ObjectId,
    ref: "Group",
    required: true,
  },
},
{timestamps: true}
)

export const GroupChat = mongoose.model("GroupChat", GroupChatSchema);


export const Message = mongoose.model("Message", MessageSchema)
export default Message