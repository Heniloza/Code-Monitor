import axios from "axios"
import { useId } from "react";
import toast from "react-hot-toast";



export const axiosInstance = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials: true,
});


export const verifyOtp = async(userId,otp)=>{
  try {
    const res = await axiosInstance.post("/auth/verify",{userId,otp:otp.join("")})
    return res.data
  } catch (error) {
   console.log(error.message);
   toast.error(error.response.data.message); 
  }
}