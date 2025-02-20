import { Response, Request, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const employeeSchema = z.object({
    name: z.string(),
    position: z.enum(['Manager', 'HR', 'Engineer']),
    salary: z.number(),
    employedAt: z.string().date().optional(),
    id: z.string().optional()
})

type ZodEmployee = z.infer<typeof employeeSchema>

export function validateAsEmployee(req: Request, res: Response, next: NextFunction) {
    try {
        const employee = employeeSchema.parse(req.body)
        req.body = employee
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400)
        }
        next(error)
    }
}

class FieldError extends Error {
}