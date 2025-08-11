import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/dbConnection.js";
import passport from "passport";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import platformRoutes from "./routes/platformRoutes.js"
import cors from "cors"
import "./config/passport.js";

const app = express();
const PORT = process.env.PORT || 5000


//Database conection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log("Error in connection database", err));


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

//Routes
app.use("/api/auth",authRoutes)
app.use("/api/platform",platformRoutes)

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT : ${PORT}`)
)