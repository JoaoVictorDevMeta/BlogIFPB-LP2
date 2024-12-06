import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255),
        course: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6),
    }),
});

