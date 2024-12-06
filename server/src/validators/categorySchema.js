import { z } from "zod";

const createCategorySchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255),
    }),
});

const updateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(3).max(255).optional(),
    }),
    params: z.object({
        id: z
            .string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val), {
                message: "Invalid number",
            }),
    }),
});

export { createCategorySchema, updateCategorySchema };