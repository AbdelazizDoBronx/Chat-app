import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    receiverId: {
        required: true,  // Corrected spelling
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    senderId: {
        required: true,  // Corrected spelling
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    text: {
        type: String,  // Optional by default
    },
    image: {
        type: String,  // Optional by default
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);  // Changed to singular

export default Message;
