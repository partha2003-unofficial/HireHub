import { Router } from "express"
import { getUser, logoutUser, registerUser, userLogin } from "../controller/user.controller.ts";
import { authenticaitonUser } from "../middleware/auth.middleware.ts";
const userRouter = Router();

userRouter.post('/signup', registerUser);
userRouter.post('/signin', userLogin)
userRouter.post('/logout', authenticaitonUser, logoutUser)
userRouter.get('/me', authenticaitonUser, getUser)

export default userRouter;