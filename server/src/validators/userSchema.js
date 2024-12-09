import { z } from "zod";

const getUserSchema = z.object({
    params: z.object({
        id: z
            .string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val), {
                message: "Invalid number",
            }),
    }), 
});

const updateUserSchema = z.object({
    body: z.object({
        userData: z.object({
            email: z.string().email().optional(),
            password: z.string().min(6).optional(),
        }),
        perfilData: z.object({
            name: z.string().optional(),
            course: z.string().optional(),
            imageUrl: z.string().url().optional(),
            grade: z.string().optional(),
            description: z.string().optional(),
            bannerUrl: z.string().url().optional(),
        }),
    }),
});

export { getUserSchema, updateUserSchema };
