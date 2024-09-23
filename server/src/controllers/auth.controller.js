import bcrypt from 'bcrypt';
import User from '../models/user.js';

const saltRounds = Number(process.env.BCRYPT_SALT); //assumindo valor do Salt

export async function register(req, res){
    const { name, email, password, course} = req.body //definindo variaveis que recebemos
    console.log(req.body)

    if( !name || !email || !password || !course ){ //validando existencia de valores nos campos
        res.status(400).send("campos incompletos");
    }

    try{
        const hashedPasswd = await bcrypt.hash(password, saltRounds); //senha criptografada
        const newUser = await User.create({ name, email, password: hashedPasswd, course}) // adicionando o usuario

        res.status(201).json(newUser);
    } catch (err){
        if(err.code === "P2002"){
            return res.status(400).send("Esse usuário já existe");
        }
        console.log(err)
        res.status(500).send(err)
    }
}
