import {create} from "zustand"
import { axiosInstance } from "../lib/api";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isLoggingin: false,
  isLoggedin: false,
  isSiggingin: false,
  isCheckingAuth: true,
  isUpdatinProfile: false,

  setUser: (user) => set({ user }),
  setIsLoggedIn: (state) => set({ isLoggedin: state }),
  setIsAuthenticated: (state) => set({ isAuthenticated: state }),

  login: async (data) => {
    set({ isLoggingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ user: res.data.user });
      set({ isLoggedin: true });
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      set({ isLoggedin: false });
    } finally {
      set({ isLoggingin: false });
    }
  },

  signup: async (data) => {
    set({ isSiggingin: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
      set({ user: res.data.user });
      set({ isLoggedin: true });
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
      set({ isLoggedin: false });
    } finally {
      set({ isSiggingin: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ user: res.data, isAuthenticated: true });
    } catch (error) {
      console.log(error.message);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ user: null, isAuthenticated: false, isLoggedin: false });
    } catch (error) {
      console.log(error.message);
    }
  },
}));