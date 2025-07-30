import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength:[6,"Password must be at least 6 character"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    profileImage:{
        type:String
    },
    provider:{
        type:String,
        enum:["email","google","github"],
        default:"email"
    }
  },
  { timestamps: true }
);

const USER = mongoose.model("Use",userSchema)