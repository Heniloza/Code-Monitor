import { create } from "zustand";
import { axiosInstance } from "../lib/api";



export const usePlatformStatsStore = create((set) => ({
    allPlatformStats:null,

    fetchAllStats:async(handles)=>{
        try {
             const queryParams = new URLSearchParams({
               github: handles.github || "",
               leetcode: handles.leetcode || "",
               codeforces: handles.codeforces || "",
             }).toString();

             const res = await axiosInstance.get(
               `/platform/all/stats/latest?${queryParams}`
             );
             set({ allPlatformStats: res.data.data });
        } catch (error) {
            console.error(error.response.data.message);
            console.log("Error in fetching all stats");
            
        }
    }
}))