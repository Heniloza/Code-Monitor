import passport from "passport"
import {Strategy as googleStrategy} from "passport-google-oauth20"
import {Strategy as githubStrategy} from "passport-github"
import USER from "../models/User.model.js"
import {config} from "dotenv"

config();

passport.use( new googleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_ID,
    callbackURL:"api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done)=>{
        try {
            const user = await USER.findOne({email:profile.email[0].value})

            if(!user){
                const newUser = await USER.create({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  provider: "google",
                  password: undefined, 
                  isVerified: true,
                  profileImage: profile.photos[0].value,
                });
            }

            return done(null, newUser);
        } catch (error) {
           return done(error)
        }
    }
))

passport.use(new githubStrategy(
    {
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_SECRET_ID,
        callbackURL:"api/auth/github/callback",
        scope:["user:email"],
    },
    async (accessToken,refreshToken,profile,done)=>{
        try {
            const email = profile.email[0].value

            if(!email) return done(null,false,{message:"no email from githubs"})

            const user = await USER.findOne({email:email})

            if(!user){
                const newUser = await USER.create({
                  name: profile.displayName || profile.username,
                  email,
                  provider: "github",
                  password: undefined,
                  isVerified: true,
                  profileImage: profile.photos[0]?.value,
                });
            }

            return done(null,newUser)
        } catch (error) {
            return done(error)
        }
    }
))