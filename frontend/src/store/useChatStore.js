import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';
import { devtools } from 'zustand/middleware'
import { useGroupStore } from './useGroupStore';

export const useChatStore = create(devtools((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isUserTyping: false,
  setSelectedUser: (selectedUser) => {
    const {setCurrentGroup} = useGroupStore.getState();
    // setCurrentGroup(null)
    set({ selectedUser })
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res?.data });

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false })
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res?.data });

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false })
    }
  },
  sendMessage: async (data) => {
    try {
      const { selectedUser, messages } = get()
    const { socket } = useAuthStore.getState();
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, data)
      socket.emit("close-typing", selectedUser._id)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  sendNotificationTyping: () => {
    const {socket} = useAuthStore.getState();
    socket.emit("typing", get().selectedUser._id)
  },
  subscribeToMessages: async () => {
    const { socket } = useAuthStore.getState();
    if (socket) {
      socket.on("message", (message) => {
        set({ messages: [...get().messages, message] })
      })
      socket.on("user-typing", () => {
        
        set({isUserTyping: true})
      })
      socket.on("stopped-typing", () => {
        set({isUserTyping: false})
      })
    }
  },
  unSubscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    if (socket) {
      socket.off("message")
      socket.emit("close-typing")

      // set({isUserTyping: false})
    }
  }
})))