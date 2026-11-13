import z from "zod";

export const createJobValidator = z.object({
    title: z.string().min(3),
    discription: z.string().min(3),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    skills: z.array(z.string()),
    employmentType: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE"
    ]),
    experienceLevel: z.enum([
        "FRESHER",
        "ENTRY_LEVEL",
        "MID_LEVEL",
        "SENIOR_LEVEL",
        "EXPERT",
    ]),
    salary: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.string().toUpperCase(),
        isNegotiable: z.boolean()
    }),
    location: z.object({
        city: z.string(),
        state: z.string(),
        contry: z.string()
    }),
    workMode: z.enum([
        "ONSITE",
        "REMOTE",
        "HYBRID"
    ]).default('ONSITE'),
    vacancies: z.number(),
    applicationDeadline: z.date(),
    status: z.enum([
        "OPEN",
        "CLOSED",
        "DRAFT"
    ])
})

export const updateJobValidator = z.object({
    title: z.string().min(3).optional(),
    discription: z.string().min(3).optional(),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    employmentType: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
        "FREELANCE"
    ]).optional(),
    experienceLevel: z.enum([
        "FRESHER",
        "ENTRY_LEVEL",
        "MID_LEVEL",
        "SENIOR_LEVEL",
        "EXPERT",
    ]).optional(),
    salary: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.string().toUpperCase(),
        isNegotiable: z.boolean()
    }).optional(),
    location: z.object({
        city: z.string(),
        state: z.string(),
        contry: z.string()
    }).optional(),
    workMode: z.enum([
        "ONSITE",
        "REMOTE",
        "HYBRID"
    ]).optional(),
    vacancies: z.number().optional(),
    applicationDeadline: z.date().optional(),
    status: z.enum([
        "OPEN",
        "CLOSED",
        "DRAFT"
    ]).optional()
})