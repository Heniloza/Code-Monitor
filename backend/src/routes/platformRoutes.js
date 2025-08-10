import {Router} from "express"
import { getCodeForcesStats } from "../controllers/platformControllers.js"

const router = Router()

router.get("/codeforces/stats",getCodeForcesStats)

export default router