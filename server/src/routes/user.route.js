import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt';

const router = express.Router()
const saltRounds = Number(process.env.BCRYPT_SALT); 

//rota para listar todos os usuários
router.get('/all', async (req, res) => {
    try{
        const users = await User.readAll()

        res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para criar um usuário
router.post('/new', async (req,res) => {
    try{
        //passando todos os atributos 
        //para facilitar correções futuras
        const { name, email, password, course, imageUrl, grade, description } = req.body

        //realizando a criação a partir do model
        const user = await User.create({name, email, password, course, imageUrl, grade, description})

        res.json(user)
    }catch (err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para atualizar um usuário pelo id
router.put('/update/:id', async (req, res) => {
    try{
        const {userData, perfilData} = req.body
        const {id} = req.params

        const {email, password} = userData
        //como vai se atualizara senha, é necessário encriptografar a nova senha
        //utilizaremos o mesmo método propost no registro
        //nsesse caso vamos defini-la abaixo
        const hashedPasswd = await bcrypt.hash(password, saltRounds);

        //fazendo primeiro no usuario
        //ou seja, nas parte onde há credenciais
        const user = await User.updateUser(id, {email, password: hashedPasswd})

        //a seguir no perfil, ou seja
        //informações a mais        
        const perfil = await User.updatePerfil(id, perfilData)

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
router.delete('/delete/:id', async (req,res) => {
    try{
        const {id} = req.params

        const user = await User.deleteUser(id)

        res.status(204).json(user)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

//rota para buscar um usuário pelo id
router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params

        const user = await User.readOne(id)

        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

export default router