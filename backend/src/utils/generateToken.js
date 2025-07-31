import jwt from "jsonwebtoken"

export default  generateToken = (user)=>{
    const token = jwt.sign({ id: user._id }, user, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
}