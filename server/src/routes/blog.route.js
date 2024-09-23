import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//todos os blogs
router.get("/all", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        category: true,
        referencies: true,
      },
    });

    res.json(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});
//blogs por categoria
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
    res.status(500).send(err);
  }
});

// >>>>>>>>>>>>>>>>>>>>>>>
//ROTAS RAPHAEL
//criação de blog
router.post("/:userId/", async (req, res) => {
  try {
    const { title, content, subTitle, category } = req.body;
    const { userId } = req.params;

    const categoryData = await prisma.category.findFirst({
      where: { name: category },
    });

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        image_url: "https://files.tecnoblog.net/wp-content/uploads/2024/02/disco_rigido_hd_tecnoblog-1536x864.jpg",
        subTitle,
        author: {
          connect: { id: Number(userId) },
        },
        category: {
          connect: { id: categoryData.id },
        },
      },
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter um blog específico
router.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { id: Number(blogId) },
      include: { author: {
        include:{ Perfil: true,}
      }, category: true, referencies: true },
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para atualizar um blog
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, description, subTitle } = req.body;
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content, description, subTitle },
    });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Rota para deletar um blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
