import z from 'zod'

export const createApplicationValidation = z.object({
    resume: z.object({
        url: z.string(),
        fileName: z.string()
    }),
    coverLetter: z.string(),
    status: z.enum([
        "APPLIED",
        "UNDER_REVIEW",
        "SHORTLISTED",
        "INTERVIEW",
        "HIRED",
        "REJECTED",
        "WITHDRAWN"
    ]),
    appliedAt: z.coerce.date(),
    lastStatusUpdateAt: z.coerce.date()

})