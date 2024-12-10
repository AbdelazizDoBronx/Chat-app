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
export const login = (req,res) => {
    res.send('login')
}
export const logout = (req,res) => {
    res.send('logout')
}