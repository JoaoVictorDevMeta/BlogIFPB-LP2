import express from "express";
import { isAuthenticated } from "../middleware/tokenValidation.js";
import category from "../models/category.js";
import { validate } from "../middleware/validate.js";
import { createCategorySchema, updateCategorySchema } from "../validators/categorySchema.js";

const router = express.Router();

//rota para criar uma categoria
router.post("/create", isAuthenticated, validate(createCategorySchema), async (req, res) => {
    try {
        const { name } = req.body;

        const DBcategory = await category.readByName(name);

        if (DBcategory) {
            return res.status(400).json({ error: "Categoria já existe" });
        }

        const newCategory = await category.create(name);

        res.status(201).json(newCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//rota para deletar uma categoria
router.delete("/:id", isAuthenticated, validate(updateCategorySchema), async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "Id inválido" });
            return;
        }

        const DBcategory = await category.deleteOne(id);

        if (!DBcategory) {
            res.status(404).json({ error: "Categoria não encontrada" });
        }

        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//rota para listar todas as categorias
router.get("/all", async (req, res) => {
    try {
        const categories = await category.readAll();

        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "Id inválido" });
            return;
        }

        const categoryData = await category.readOne(id);

        if (!categoryData) {
            res.status(404).json({ error: "Categoria não encontrada" });
        }

        res.json(categoryData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;
