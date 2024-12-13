import express from 'express'
import  authRoutes  from './routes/auth.route.js';
import  authMessages  from './routes/message.route.js';
import dotenv from  'dotenv';
import { dbConnection } from './lib/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))
app.use('/api/auth',authRoutes);
app.use('/api/messages',authMessages);
app.listen(PORT,()=>{
    console.log('listen port is from PORT : '+PORT);
    dbConnection();
})