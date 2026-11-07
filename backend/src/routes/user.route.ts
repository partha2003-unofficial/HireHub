import {Router}  from "express"
import { registerUser } from "../controller/user.controller.ts";
const userRouter = Router();

userRouter.post('/signup',registerUser);

export default userRouter;