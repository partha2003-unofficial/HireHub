import env from 'dotenv';
env.config();
import express from "express";
import { connectWithDatabase } from './config/db.ts';
import userRouter from './routes/user.route.ts';
const application = express();

application.use(express.urlencoded({ extended: true }));
application.use(express.json())

connectWithDatabase
application.use('/api/user',userRouter)

application.listen(process.env.APPLICATION_PORT, () => console.log('server is running'));