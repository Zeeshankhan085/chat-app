import {create} from "zustand"
import { devtools } from 'zustand/middleware'
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

export const useGroupStore = create(devtools((set, get) => ({
  groups: [],
  groupMessages: [],
  currentGroup: null,
  isLoading: false,

  setCurrentGroup: (group) => {
    const {setSelectedUser} = useChatStore.getState()
    // setSelectedUser(null)
    set({currentGroup: group});
  },
  fetchGroups: async () => {
    const res = await axiosInstance.get("/groups");
    set({groups: res.data})
    console.log(res.data)
  },
  createGroup: async (newGroup) => {
    const group = await axiosInstance.post("/groups", newGroup);
    
    get().setCurrentGroup(group)    
  },

  addUsersToGroup: async (groupId, users) => {
    const res = await axiosInstance.patch(`/groups/${groupId}/users`, {users});
    console.log(res);
  },
  sendGroupMessage: async (message) => {
    const res = await axiosInstance.post(`/groups/${get().currentGroup._id}/message`, message)
      set({ groupMessages: [...get().groupMessages, res.data] })

  },
  getGroupMessages: async () => {
    set({isLoading: true});
    const res = await axiosInstance.get(`/groups/${get().currentGroup._id}/messages`);
    set({groupMessages: res.data})
    set({isLoading: false})
  },
  subscribeToGroupMessages: async () => {
    const {socket} = useAuthStore.getState();
    if(socket){
      
      socket.emit("new-chatroom", get().currentGroup._id)
      socket.on("group-chat-received", (message) => {
        set({ groupMessages: [...get().groupMessages, message] })
        
      })
    }
  },
  unSubscribeToGroupMessages: async () => {
    const {socket} = useAuthStore.getState();
    if(socket){
      socket.emit("exit-chatroom", get().currentGroup._id)
      socket.off("group-chat-received")
    }
  }
})))