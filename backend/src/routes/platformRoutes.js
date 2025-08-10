import {Router} from "express"
import { getAllStats, getAllStatsHistory, getCodeForcesStats, getGithubStats, getLeetcodeStats,  } from "../controllers/platformControllers.js"

const router = Router()

router.get("/codeforces/stats",getCodeForcesStats)
router.get("/github/stats",getGithubStats)
router.get("/leetcode/stats",getLeetcodeStats)
router.get("/all/stats/latest",getAllStats)
router.get("/all/stats/history",getAllStatsHistory)

export default router