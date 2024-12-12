import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js';
import {getAllActiveUsers,getUserChat,sendMessage} from '../controllers/message.controller.js'


const router = express.Router();
router.get('/all-users',protectRoute,getAllActiveUsers)
router.get('/chat/:id',protectRoute,getUserChat)
router.post('/chat/send/:id',protectRoute,sendMessage)

export default router