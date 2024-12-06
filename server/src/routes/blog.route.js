import express from "express";
import { PrismaClient } from "@prisma/client";
import blog from "../models/blog.js";
import { isAuthenticated } from "../middleware/tokenValidation.js";
import { validate } from "../middleware/validate.js";
import { createBlogSchema, deleteBlogSchema, updateBlogSchema } from "../validators/blogSchema.js";

const router = express.Router();
const prisma = new PrismaClient();

//todos os blogs
router.get("/all", async (req, res) => {
    try {
        const blogs = await blog.readAll();

        res.json(blogs);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota para obter um blog específico
router.get("/:blogId", async (req, res) => {
    try {
        const blogId = parseInt(req.params.blogId);

        if (isNaN(blogId)) {
            return res.status(400).json({ error: "Id inválido" });
        }

        const result = await blog.readById(blogId);

        if (!result) {
            return res.status(404).json({ error: "Blog não encontrado" });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//blogs por busca
router.get("/search/", async (req, res) => {
    try {
        const { search } = req.query;

        const blogs = await prisma.blog.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                        },
                    },
                    {
                        content: {
                            contains: search,
                        },
                    },
                    {
                        subTitle: {
                            contains: search,
                        },
                    },
                ],
            },
            include: {
                category: true,
                referencies: true,
            },
        });

        res.json(blogs);
    } catch (err) {
        res.status(500).json(err);
    }
});

//criação de blog
router.post("/create", isAuthenticated, validate(createBlogSchema), async (req, res) => {
    try {
        const { title, content, subTitle, category, image_url } = req.body;
        const userId = req.userId;

        const categoryData = await prisma.category.findFirst({
            where: { name: category },
        });

        if (!categoryData) {
            return res.status(400).json({ error: "Categoria não encontrada" });
        }

        const newBlog = await blog.create({
            author_id: userId,
            category_id: categoryData.id,
            title,
            content,
            subTitle,
            image_url,
        });

        res.status(201).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar um blog
router.put("/:id", isAuthenticated, async (req, res) => {
    try {
        const userId = req.userId;
        const id = req.params.id;

        const { title, content, description, subTitle } = req.body;

        const updatedBlog = await blog.updateContent(id, {
            title,
            content,
            description,
            subTitle,
        });

        res.json(updatedBlog);
    } catch (err) {
        //esse tratamento de erro consiste em
        //utilizar do proprio código de erro do prisma para indentificação
        if (err.code === "P2025") {
            return res.status(404).json({ error: "Blog não encontrado" });
        }
        res.status(500).json({ error: err.message });
    }
});

// Rota para deletar um blog
router.delete("/:id", isAuthenticated, async (req, res) => {
    try {
        const id = req.params.id;

        await blog.deleteOne(id);

        res.sendStatus(204);
    } catch (err) {
        if (err.code === "P2025") {
            return res.status(404).json({ error: "Blog não encontrado" });
        }
        res.status(500).json({ error: err.message });
    }
});

export default router;
