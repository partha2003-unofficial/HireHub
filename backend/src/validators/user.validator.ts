import {  z } from 'zod';

export const userValidation = z.object({
    fullName: z.object({
        firstName: z.string()
            .min(3, 'enter minimum 3 characters'),
        lastName: z.string()
            .optional()
    }),
    email: z.email(),
    password: z.string(),
    role: z.enum(["EMPLOYER", "CANDIDATE"])
})