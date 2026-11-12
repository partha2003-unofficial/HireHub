import z from 'zod';

export const createCompanyValidation = z.object({
    
    name: z.string().min(3).max(99, { message: 'enter maximum 99 characters' }),
    discription: z.string().min(10, { message: 'enter minimum 10 characters' }),
    website: z.string().startsWith('https://'),
    logo: z.string(),
    industry: z.string(),
    conpanySize: z.enum(
        [
            "1-10",
            "11-50",
            "51-200",
            "201-500",
            "501-1000",
            "1000+"
        ]
    ),
    location: z.object(
        {
            city: z.string(),
            state: z.string(),
            country: z.string(),
            address: z.string()
        }
    ),
    foundedYear: z.number()
})

export const updateCompanyValidation = z.object({
    
    name: z.string().min(3).max(99, { message: 'enter maximum 99 characters' }).optional(),
    discription: z.string().min(10, { message: 'enter minimum 10 characters' }).optional(),
    website: z.string().startsWith('https://').optional(),
    logo: z.string().optional(),
    industry: z.string().optional(),
    conpanySize: z.enum(
        [
            "1-10",
            "11-50",
            "51-200",
            "201-500",
            "501-1000",
            "1000+"
        ]
    ).optional(),
    location: z.object(
        {
            city: z.string(),
            state: z.string(),
            country: z.string(),
            address: z.string()
        }
    ).optional(),
    foundedYear: z.number().optional()
})