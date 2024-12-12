import express from 'express';
import { signup,login,logout, checkAuth, updateProfile } from '../controllers/auth.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js'
const router = express.Router();

router.post('/signup' , signup)
router.post('/login' , login)
router.post('/logout' , logout)
router.put('/profile-update',protectRoute,updateProfile)
router.get('/check',protectRoute,checkAuth)

export default router;