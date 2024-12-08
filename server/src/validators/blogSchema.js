import { z } from "zod";
import sanitize from "sanitize-html";

const sanitizeContent = (content) => {
    return sanitize(content, {
        allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
            ...sanitize.defaults.allowedAttributes,
            img: ["src"],
        },
    });
}

const createBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255),
        content: z.string().min(3).transform(sanitizeContent),
        subTitle: z.string().min(3).max(255),
        category: z.string().min(3).max(255),
        image_url: z.string().url(),
    }),
});

const updateBlogSchema = z.object({
    body: z.object({
        title: z.string().min(3).max(255).optional(),
        content: z.string().min(3).transform(sanitizeContent),
        subTitle: z.string().min(3).max(300).optional(),
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
