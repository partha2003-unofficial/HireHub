import env from 'dotenv'
env.config()
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import type { AuthUser } from '../types/express.js';

export function createToken(user: { _id: Types.ObjectId }) {
    const payload = {
        id: user._id
    }
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' })

}

export function verifyToken(token: string): AuthUser {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decode === "string" || typeof decode.id !== "string") {
        throw new Error("Invaled token payload")
    }

    return { id: decode.id };
}