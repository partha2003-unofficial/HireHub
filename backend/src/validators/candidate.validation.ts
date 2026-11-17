import z from 'zod';

export const createCandidateValidation = z.object({
    phone: z.number(),
    headline: z.string(),
    bio: z.string(),
    skills: z.array(z.string()),
    experience: z.array(
        z.object({
            comapny: z.string(),
            position: z.string(),
            StateDate: z.coerce.date(),
            endDate: z.coerce.date(),
            currentlyWorking: z.boolean(),
            discription: z.string()
        })
    ),
    education: z.array(
        z.object({
            institution: z.string(),
            degree: z.string(),
            fildOfStudy: z.string(),
            startYear: z.number(),
            endYear: z.number()
        })
    ),
    resume: z.object({
        url: z.string(),
        publicId: z.string(),
        fileName: z.string(),
        uploadAt: z.coerce.date(),
    }),
    location: z.object({
        city: z.string(),
        state: z.string(),
        country: z.string()
    }),
    portfolio: z.string(),
    linkedIn: z.string()
})

export const modifyCandidateValidation = z.object({
    phone: z.number().optional(),
    headline: z.string().optional(),
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    experience: z.array(
        z.object({
            comapny: z.string(),
            position: z.string(),
            StateDate: z.coerce.date(),
            endDate: z.coerce.date(),
            currentlyWorking: z.boolean(),
            discription: z.string()
        })
    ).optional(),
    education: z.array(
        z.object({
            institution: z.string(),
            degree: z.string(),
            fildOfStudy: z.string(),
            startYear: z.number(),
            endYear: z.number()
        })
    ).optional(),
    resume: z.object({
        url: z.string(),
        publicId: z.string(),
        fileName: z.string(),
        uploadAt: z.coerce.date(),
    }).optional(),
    location: z.object({
        city: z.string(),
        state: z.string(),
        country: z.string()
    }).optional(),
    portfolio: z.string().optional(),
    linkedIn: z.string().optional()
})