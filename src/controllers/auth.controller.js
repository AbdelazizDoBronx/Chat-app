import { generateTowken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
export const signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    if (!fullName || !password || !email){
        return res.status(400).json({message:"all fields are required!"})
    }
    try {
        if(password.length < 6){
            return res.status(400).json({message:"Password must contain at least 6 caracteres!"})
        }
        
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message:"Email already existe!"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)  
        
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
    })

    if(newUser){
        generateTowken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic

        })
    }else{
        res.status(400).json({message:"Invalide user data!"})
    }
    } catch (error) {
        res.status(501).json({message:"bad api request!"})
    }
}
export const login = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({massage:"invalid cerditinals!"})
        }
        const isCorrectPassword = await bcrypt.compare(password,user.password)
        if(!isCorrectPassword){
            res.status(400).json({message:"invalid cerdentinals!"})
        }
        generateTowken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        res.status(500).json({message:"server error!"})
    }
}
export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout succesfully!"})
    } catch (error) {
        res.status(500).json({message:"server error!"})
    }
}

export const updateProfile = async (req,res) => {
    
}