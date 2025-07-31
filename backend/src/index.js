import express from "express"
import dotenv from "dotenv"
dotenv.config();
import connectDB from "./config/dbConnection.js";

const app = express();
const PORT = process.env.PORT || 5000


//Database conection
connectDB(process.env.MONGO_URI)
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log("Error in connection database", err));

app.listen(PORT,()=>console.log(`SERVER STARTED AT PORT : ${PORT}`)
)