import express from 'express'
import  authRoutes  from './routes/auth.route.js';
import dotenv from  'dotenv';
import { dbConnection } from './lib/db.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use('/api/auth',authRoutes);
app.listen(PORT,()=>{
    console.log('listen port is from PORT : '+PORT);
    dbConnection();
})