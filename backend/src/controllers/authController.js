import USER from "../models/User.model.js"
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary.js"



export const signupController = async(req,res)=>{
    try {
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({
                message: "Please fill in all fields",  
            })
        }

        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
        }

        const existingUser = await USER.findOne({email})

        if(existingUser){
            res.status(400).json({
                message: "Email already in use"
            })
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const newUser = await USER.create({
            name,
            email,
            password:hashedPassword
        })

        res.status(201).json({
            user:newUser,
            message:"New user created"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error signing up user",
            success:false,
        })
    }
}

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
        }

        const user = await USER.findOne({email})
        const isMatch = await bcrypt.compare(password,user?.password)

        if(!user || !isMatch) return res.status(400).json({
            message:"Invalid credentials"
        })

        res.status(200).json({
            user,
            message:"User logged in successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:"Error in loggin in user"
        })
    }
}

export const logoutController = async (req, res) => {
  try {
        res.clearCookie("token")
        .status(200).json({message:"User logged out successfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error in loggin in user",
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const {profileImage} = req.body
    const userId = req.user._id

    if(!profileImage || !userId) return res.status(400).json({message:"Image and userid is required"})

    const uploadResponse = await cloudinary.uploader.upload(profileImage)
    const updatedUser = await USER.findByIdAndUpdate(
        userId,
        {
            profileImage:uploadResponse.secure_url
        },
        {new:true}
    )

    res.status(200).json({
        user:updatedUser,
        message:"Profile picture updated"
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error in loggin in user",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await USER.findById(userId)

    if(!user) res.status(404).json({
        message:"User not found"
    })

    res.status(200).json(user)
  } catch (error) {
    console.log(error.message,"Internal server error");
  }
};