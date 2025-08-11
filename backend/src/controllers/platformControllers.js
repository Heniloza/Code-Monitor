import { fetchAllPlatformStats } from "../models/platformAggregator.js";
import STATSHISTORY from "../models/statsHistory.model.js";
import STATS from "../models/userStats.model.js";
import { fetchCodeforcesStats } from "../services/codeForcesService.js";
import { fetchGithubStats } from "../services/githubService.js";
import { fetchLeetCodeStats } from "../services/leetcodeServices.js";


export const getCodeForcesStats = async(req,res)=>{
    try {
        const {handle} = req.query;
        if(!handle) return res.status(400).json({message:"Codeforces handle is required"})
        
        const stats = await fetchCodeforcesStats(handle)

        res.status(200).json({
            message: "Codeforces stats fetched successfully",
            data:stats
        })
        
    } catch (error) {
        console.log("Codeforces API error",error.message);
        res.status(500).json({
            message:"Failed to fetch codeforces stats",
            error:error.message
        })
        
    }
}

export const getGithubStats = async(req,res)=>{
    try {
        const username = req.query.username || req.user?.platformHandles?.github;
        if(!username){
            return res.status(400).json({
                message:"Github username is required"
            })
        }

        const stats = await fetchGithubStats(username)

        res.status(200).json({
            data:stats,
            message:"Github stats fetched"
        })
    } catch (error) {
        console.log("Github API error",error.message);
        res.status(500).json({
            message:"Failed to fetch github stats",
            error:error.message
        })
    }
}

export const getLeetcodeStats = async(req,res)=>{
    try {
        const  username  = req.query.username || req.user?.platformHandles?.leetcode;
        if(!username){
            return res.status(400).json({
                message:"Leetcode username is required"
            })
        }

        const stats = await fetchLeetCodeStats(username)

        res.status(200).json({
            message:"Leetcode data fetched",
            data:stats
        })
    } catch (error) {
        console.log("Failed to fetch leetcode stats");
        res.status(500).json({
            message:"Failed to fetch leetcode stats",
            error:error.message
        })
    }
}

export const getAllStats = async(req,res)=>{
    try {
         const handles = {
           codeforces:
             req.query.codeforces || req.user?.platformHandles?.codeforces,
           github: req.query.github || req.user?.platformHandles?.github,
           leetcode: req.query.leetcode || req.user?.platformHandles?.leetcode,
         };

         if (!handles.codeforces && !handles.github && !handles.leetcode) {
           return res
             .status(400)
             .json({ message: "At least one platform handle is required" });
         }

         const stats = await fetchAllPlatformStats(handles)

          if (req.user?._id) {
            await STATS.findOneAndUpdate(
              { userId: req.user._id },
              { $set: { stats, updatedAt: new Date() } },
              { upsert: true, new: true }
            );

             await STATSHISTORY.create({
               userId: req.user._id,
               stats,
             });
          }

          res.status(200).json({ success: true, data: stats });

    } catch (error) {
        console.log("Unified stats error",error.message);
        res.status(500).json({
            message:"Failed to fetch unified stats",
            error:error.message
        })
    }
}

export const getAllStatsHistory = async(req,res)=>{
    try {
        const history = await STATSHISTORY.find({userId:req.user._id}).sort({date:1})
        res.status(200).json({
            history,
            message:"All stats history fetched successfully"
        })
    } catch (error) {
        console.log("Error in fetching historical data of all stats",error.message);
        res.status(500).json({
          message: "Error in fetching historical data of all stats",
          error:error.message
        });
        
    }
}