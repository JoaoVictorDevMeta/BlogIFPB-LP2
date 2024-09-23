import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get('', (req, res) => {
    res.send('category route')
})

//rota para criar uma categoria
router.post('/:categoryName', async (req,res) => {
    try{
        const { categoryName } = req.params;


        const newCategory = await prisma.category.create({
            data: {
                name: categoryName
            }
        })

        res.json(newCategory)
    }catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para deletar uma categoria
router.delete('/:id', async (req,res) => {
    try{
        const { id } = req.params

        const category = await prisma.category.delete({
            where: {
                id
            }
        })

        res.json(category)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para listar todas as categorias
router.get('/all', async (req, res) => {
    try{
        const categories = await prisma.category.findMany()

        res.json(categories)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
});

//rota listar todos os blogs de uma categoria

export default router;