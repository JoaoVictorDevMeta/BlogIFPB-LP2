import { z } from "zod";

const createBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255),
        content: z.string().min(3),
        subTitle: z.string().min(3).max(255),
        category: z.string().min(3).max(255),
        image_url: z.string().url(),
    }),
});

const updateBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255).optional(),
        content: z.string().min(3).optional(),
        subTitle: z.string().min(3).max(255).optional(),
        category: z.string().min(3).max(255).optional(),
        image_url: z.string().url().optional(),
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

const deleteBlogSchema = z.object({
    params: z.object({
        id: z
            .string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val), {
                message: "Invalid number",
            }),
    }),
});

export { createBlogSchema, updateBlogSchema, deleteBlogSchema };
