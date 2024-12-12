import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllActiveUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const allActiveUsers = await User.find({_id: {$ne: userId}}).select('-password');
        res.status(200).json(allActiveUsers);
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error!" });
    }
}

export const getUserChat = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params;

        const messages = await Message.find({$or: [
            { receiverId: senderId, senderId: receiverId },
            { receiverId: receiverId, senderId: senderId }
        ]})

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imgUrl;

        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imgUrl = uploadResponse.secure_url;
            } catch (error) {
                return res.status(500).json({ message: "Image upload failed!" });
            }
        }

        const newMessage = new Message({
            receiverId,
            senderId,
            text,
            image: imgUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
    }
}
