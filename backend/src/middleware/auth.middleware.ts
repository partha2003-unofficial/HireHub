import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/tokenServices.ts";
import userModel from "../model/user.model.ts";

export async function authenticaitonUser(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.headers.authorization?.split(' ')[1] ||
            request.headers?.cookie || null

        if (!token) {
            return response.status(404).json({
                message: "token is not founded !",
                token: token
            })
        }
        const vaidateToken = verifyToken(token);
        const findUser = await userModel.findById(vaidateToken.id);

        if (findUser === null || findUser.isActive === false) {
            return response.status(400).json({
                message: 'user is not validate'
            })
        }

        request.user = vaidateToken;
        next();

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error in middleware'
        })
    }

}  