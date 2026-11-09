import env from 'dotenv';
env.config();
import express from "express";
import { connectWithDatabase } from './config/db.ts';
import userRouter from './routes/user.route.ts';
const application = express();

connectWithDatabase(process.env.MONGODB_URL || "null")

application.use(express.urlencoded({ extended: true }));
application.use(express.json())

application.use('/api/v1/user', userRouter)

application.listen(process.env.APPLICATION_PORT, () => console.log('server is running'));