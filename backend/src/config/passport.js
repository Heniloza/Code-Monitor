import passport from "passport"
import {Strategy as googleStrategy} from "passport-google-oauth20"
import {Strategy as githubStrategy} from "passport-github"
import USER from "../models/User.model.js"
import {config} from "dotenv"
import axios from "axios"

config();

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      ;
      
      try {
        const user = await USER.findOne({ email: profile.emails[0].value });

        

        if (!user) {
          const newUser = await USER.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
            password: undefined,
            isVerified: true,
            isFirstLogin:false,
            profileImage: profile.photos[0].value,
          });
          return done(null,newUser)
        }

        return done(null, user);
      } catch (error) {
      console.error("GitHub Strategy Error:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile, "Profile data");
      try {
        
        const { data: emails } = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `token ${accessToken}`,
              "User-Agent": "Node.js",
            },
          }
        );

        const primaryEmailObj = emails.find(
          (email) => email.primary && email.verified
        );
        const email = primaryEmailObj?.email || emails[0]?.email;
            console.log(email);

        if (!email) {
          console.log(" No email returned from GitHub API");
          return done(null, false, { message: "No email from GitHub" });
        }

       
        let user = await USER.findOne({ email });

        if (!user) {
          user = await USER.create({
            name: profile.displayName || profile.username,
            email,
            provider: "github",
            password: undefined,
            isVerified: true,
            isFirstLogin: false,
            profileImage: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("GitHub Strategy Error:", error);
        return done(error);
      }
    }
  )
);