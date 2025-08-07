import express from "express"
import passport from "passport";
import generateToken from "../utils/generateToken.js";
import { checkAuth, loginController, logoutController, platformHandleController, signupController, updateProfileController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {  verifyOtpController } from "../controllers/otpController.js";

const router = express.Router();

//auth routes 
router.post("/login",loginController)
router.post("/signup",signupController)
router.post("/logout",logoutController)
router.post("/update-profile",authMiddleware,updateProfileController)
router.get("/check-auth",authMiddleware,checkAuth)

//Otp generate and verify  routes
router.post("/verify", verifyOtpController);

//Platform handles route
router.patch("/platform-handles",authMiddleware,platformHandleController)

//OAuth routes 
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
router.get("/google/callback",
    passport.authenticate("google",{session:false,failureRedirect:"/login"}),
    (req,res)=>{
        const token = generateToken(req.user._id)
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .redirect(`http://localhost:5173/auth/success`);;
    }
)

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .redirect(`http://localhost:5173/auth/success`);
  }
);

export default router
