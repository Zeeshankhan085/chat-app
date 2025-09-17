import { GroupChat } from "../models/message.model"
import { Group } from "../models/group.model"


export const createGroup = async (req, res) => {
  const user = req.user;
  const {title} = req.body

  const group = new Group({
    users: [user._id],
    admin: user._id,
    title: title,
  })

  const newGroup = await group.save()
  return res.json(201).json(newGroup)

}

export const sendMessage = async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.user._id;
  const text = req.body.text;

  const groupMessage = new GroupChat({
    groupId,
    senderId: userId,
    text,
  })

const newGroupMessage = await groupMessage.save()
return res.json(201).json(newGroupMessage)



}