import type { Request, Response } from 'express'
import { userValidation } from '../validators/user.validator.ts'
import userModel from '../model/user.model.ts'
import z from 'zod'
import { hashPassword } from '../services/hashPassword.services.ts'

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