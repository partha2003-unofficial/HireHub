import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth/tokenServices.ts";

export function authenticaitonUser(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            return response.status(404).json({
                message: "token is not founded !",
                token: token
            })
        }
        request.user = verifyToken(token);
        next();

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error in middleware'
        })
    }

}  