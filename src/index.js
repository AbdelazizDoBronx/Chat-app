import express from 'express'
import  authRoutes  from './routes/auth.route.js';
import  authMessages  from './routes/message.route.js';
import dotenv from  'dotenv';
import { dbConnection } from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app,server } from './lib/socket.js';


dotenv.config();
const PORT = process.env.PORT;

app.use(cookieParser());

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))
app.use(express.json({ limit: '50mb' }));  // Adjust the size limit as needed
app.use('/api/auth',authRoutes);
app.use('/api/messages',authMessages);
server.listen(PORT,()=>{
    console.log('listen port is from PORT : '+PORT);
    dbConnection();
})