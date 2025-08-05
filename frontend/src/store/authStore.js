import {create} from "zustand"
import { axiosInstance } from "../lib/api";
import toast from "react-hot-toast";


export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    isLoading:false,
    isLoggingin:false,
    isLoggedin:false,
    isSiggingin:false,
    isCheckingAuth:true,
    isUpdatinProfile:false,

    login:async(data)=>{
        set({isLoggingin:true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({user:res.data.user})
            set({ isLoggedin: true });
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
            set({ isLoggedin: false });
        }
        finally{
            set({isLoggingin:false})
        }
    },

    signup:async(data)=>{
        set({ isSiggingin: true });
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            console.log(res);
            set({user:res.data.user})
            set({isLoggedin:true})
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
            set({ isLoggedin: false });
        }finally{
            set({ isSiggingin: false });
        }
    }
}))