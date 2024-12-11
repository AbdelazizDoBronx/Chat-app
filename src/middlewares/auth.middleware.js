import User from "../models/user.model";
import jwt, { decode } from 'jsonwebtoken';


export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({message:"unauthorized no token found!"})
        }
        const decode =  jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({message:"unauthorized  token not valid!"})
        }
        const user = User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"user not found!"})
        }
        res.user = user
        next()
    } catch (error) {
        res.status(500).json({message:"server error!"})
    }
}