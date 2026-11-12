import type { Request, Response, NextFunction } from "express";
import userModel from "../model/user.model.ts";

export async function employerAuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    const user = await userModel.findById(request.user?.id);
    if (user?.role === 'EMPLOYER') {
        return next();
    } else {
        return response.status(400).json({
            message: 'only EMPLOYER can create do this',
            userId: request.user?.id
        })
    }
}