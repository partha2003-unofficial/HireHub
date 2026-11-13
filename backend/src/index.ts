import env from 'dotenv';
env.config();
import express from "express";
import { connectWithDatabase } from './config/db.ts';
import userRouter from './routes/user.route.ts';
import companyRouter from './routes/company.route.ts';
import { authenticaitonUser } from './middleware/auth.middleware.ts';
import jobRouter from './routes/job.route.ts';

const application = express();

connectWithDatabase(process.env.MONGODB_URL || "null")

application.use(express.urlencoded({ extended: true }));
application.use(express.json())

application.use('/api/v1/user', userRouter)
application.use('/api/v1/company', authenticaitonUser, companyRouter)
application.use('/api/v1/job', authenticaitonUser, jobRouter)

application.listen(process.env.APPLICATION_PORT, () => console.log('server is running'));