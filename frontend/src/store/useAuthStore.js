import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL= import.meta.env.MODE === 'development' ? "http://localhost:5001" : '/'

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingin: false,
  onlineUsers: [],
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data })
      get().connectSocket()

    } catch (err) {
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningup: true })
      const res = await axiosInstance.post('/auth/signup/', data)
      set({ authUser: res.data })
      toast.success("Account created successfully")
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningup: false })

    }
  },
  login: async (data) => {
    try {
      set({ isLoggingin: true })
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data })
      toast.success("Logged in Successfuly")
      get().connectSocket()

    } catch (error) {
      toast.error(error.response.data.message)

    } finally {
      set({ isLoggingin: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('auth/logout')
      set({ authUser: null })
      toast.success("Logged out Successfuly")
      get().disconnectSocket()

    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data })
      toast.success("Profile Updated Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  connectSocket: () => {
    if(get().socket?.connected || !(get().authUser)) return
    const socket = io(BASE_URL, {
      query: {userId: get().authUser._id}
    });
    socket.connect()
    set({socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
      
    })
  },
  disconnectSocket: () => {
    const {socket} = get();
    if(socket){
      socket.disconnect();
      set({socket: null})
    }
  }
}))