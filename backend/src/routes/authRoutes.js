import express from "express"
import passport from "passport";
import generateToken from "../utils/generateToken.js";

const router = express.Router();


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
          .redirect("/");;
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
      .redirect("/");
  }
);

export default router
