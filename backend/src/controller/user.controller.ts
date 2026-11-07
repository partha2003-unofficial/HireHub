import type { Request, Response } from 'express'
export async function registerUser(req: Request, res: Response): Promise<Response> {
    try {
        return res.status(200).json({ message: 'good' })
    } catch (error) {
        return res.status(500).json({ message: 'internal sever error' })
    }
}