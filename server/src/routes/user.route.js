import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//rota para listar todos os usuários
router.get('/all', async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            include: {
                Perfil: true
            }
        })

        res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para criar um usuário
router.post('/new', async (req,res) => {
    try{
        const data = req.body

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                Perfil: {
                    create: {
                        image_url: data?.image_url,
                        name: data.name,
                        course: data?.course,
                        grade: data?.grade,
                        description: data?.description,
                    }
                }
            }
        })

        res.json(user)
    }catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para atualizar um usuário pelo id
router.put('/:id', async (req, res) => {
    try{
        const {userData, perfilData} = req.body
        const {id} = req.params

        const user = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: userData.email,
                password: userData.password,
            }
        })

        const perfil = await prisma.perfil.update({
            where: {
                user_id: parseInt(id)
            },
            data: {
                image_url: perfilData?.image_url,
                name: perfilData.name,
                course: perfilData?.course,
                grade: perfilData?.grade,
                description: perfilData?.description,
            }
        })

        const response = {
            ...user,
            perfil: perfil
        }
        res.json(response)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para apagar um usuário
router.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params

        const user = await prisma.user.delete({
            where: {
                id: parseInt(id)
            },
        })

        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para buscar um usuário pelo id
router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                Perfil: true
            }
        })

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

export default router