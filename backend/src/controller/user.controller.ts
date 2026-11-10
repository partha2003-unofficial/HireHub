import type { Request, Response } from 'express'
import { loginValidation, userValidation } from '../validators/user.validator.ts'
import userModel from '../model/user.model.ts'
import z from 'zod'
import { hashPassword, verifyHashPassword } from '../services/hashPassword.services.ts'
import { createToken } from '../services/tokenServices.ts'

export async function registerUser(request: Request, response: Response): Promise<Response> {
    try {

        const { data, success, error } = userValidation.safeParse(request.body)
        if (error || !success) {
            return response.status(404).json({
                message: 'data did not give properly',
                error: z.flattenError(error)
            })
        }

        const { fullName, email, password } = data

        const isExstingUserPresent = await userModel.findOne({ email: email ?? null })
        if (isExstingUserPresent !== null) {
            return response.status(409).json({
                message: 'user is already present'
            })
        }
        const hashedPassword = hashPassword(password);
        const user = await userModel.create({
            ...data,
            password: hashedPassword,
            fullName: {
                firstName: fullName.firstName,
                ...(fullName.lastName != undefined && { lastName: fullName.lastName })
            }
        })
        if (!user) {
            return response.status(401).json({
                message: 'user is not created !'
            })
        }
        return response.status(200).json({
            message: 'user created successfully',
            user: user
        })
    } catch (error) {
        return response.status(500).json({ message: 'internal sever error' })
    }
}

export async function userLogin(request: Request, response: Response): Promise<Response> {
    try {
        const { data, error, success } = loginValidation.safeParse(request.body)
        if (error || !success) {
            return response.status(400).json({
                message: 'data is not given properly',
                error: z.flattenError(error)
            })
        }

        const { email, password } = data;

        const user = await userModel.findOne({ email })
        if (!user) {
            return response.status(404).json({
                message: 'user in not found !'
            })
        }

        const compareHashPassword = await verifyHashPassword(user?.password, password);
        if (compareHashPassword == false) {
            return response.status(404).json({
                message: 'password not hashed'
            })
        }

        const token = createToken(user)
        response.cookie("user_Authentication_token", token);

        return response.status(200).json({
            message: "user is validate",
            token: token
        })
    } catch (error) {
        return response.status(500).json({
            message: "internal server error in login user"
        })
    }
}

export function logoutUser(request: Request, response: Response) {

    try {
        const deleteToken = response.removeHeader || response.clearCookie('user_Authentication_token') || null;
        if (!deleteToken) {
            return response.status(400).json({
                message: 'token is not deleted'
            })
        }

        return response.status(200).json({
            message: 'user is logout successfully',
            token: deleteToken
        })

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error',
            error: error
        })
    }
}

export async function getUser(request: Request, response: Response) {
    try {
        const user = await userModel.findById(request.user?.id, {
            password: 0, email: 0
        });

        if (user == null || !user) {
            return response.status(400).json({
                message: 'user is did not found !'
            })
        }

        return response.status(200).json({
            user: user
        })

    } catch (error) {
        return response.status(500).json({
            message: 'internal server error',
            error: error
        })
    }
}