import { fetchCodeforcesStats } from "../services/codeForcesService.js";


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