import express from 'express';
import { signup,login,logout } from '../controllers/auth.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post('/signup' , signup)
router.post('/login' , login)
router.post('/logout' , logout)
router.put('/profile-update',protectRoute,updateProfile)

export default router;