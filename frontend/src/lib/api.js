import axios from "axios"
import { useId } from "react";
import toast from "react-hot-toast";



export const axiosInstance = axios.create({
  baseURL:"http://localhost:5000/api",
  withCredentials: true,
});

// export const sendOtp = async(userId)=>{
//   try {
//     const res = await axiosInstance.post("/auth/generate",userId)
//     return res.data
//   } catch (error) {
//     console.log(error.message);
//     toast.error(error.response.data.message)
//   }
// }

export const verifyOtp = async(userId,otp)=>{
  try {
    const res = await axiosInstance.post("/auth/verify",{useId,otp:otp.join("")})
    return res.data
  } catch (error) {
   console.log(error.message);
   toast.error(error.response.data.message); 
  }
}