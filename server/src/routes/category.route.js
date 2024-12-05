import express from "express";
import { isAuthenticated } from "../middleware/tokenValidation";
import category from "../models/category";

const router = express.Router();

//rota para criar uma categoria
router.post(isAuthenticated, '/create', async (req,res) => {
    try{
        const {name} = req.body;

        const category = await category.findByName(name)

        if(category){
            return res.status(400).json({error: 'Categoria já existe'})
        }

        const newCategory = await category.create(name)

        res.json(newCategory)
    }catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

//rota para deletar uma categoria
router.delete(isAuthenticated, '/:id', async (req,res) => {
    try{
        const id = parseInt(req.params.id)

        if(isNaN(id)){
            res.status(400).json({error: 'Id inválido'})
            return
        }

        const category = await category.deleteOne(id)

        if(!category){
            res.status(404).json({error: 'Categoria não encontrada'})
        }

        res.sendStatus(204)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

//rota para listar todas as categorias
router.get(isAuthenticated, '/all', async (req, res) => {
    try{
        const categories = await category.readAll()

        res.json(categories)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
});

export default router;