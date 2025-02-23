import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Token from "../models/token.js";

import { sendMail } from "../utils/sendMail.js";

const saltRounds = Number(process.env.BCRYPT_SALT); //assumindo valor do Salt

export async function register(req, res) {
    const { name, email, password, course } = req.body; //definindo variaveis que recebemos
    //console.log(req.body);

    try {
        const hashedPasswd = await bcrypt.hash(password, saltRounds); //senha criptografada
        const newUser = await User.create({
            name,
            email,
            password: hashedPasswd,
            course,
        }); // adicionando o usuario

        await sendMail(
            email,
            "Seja bem-vindo ao BlogIFPB!",
            `
            Seja bem-vindo a comunidade de estudantes e professores do IFPB!
            Lembre-se de ler atentamente as regras, esperamos que tenha uma 
            ótima experiencia em nosso site.
        `
        );

        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json("Esse usuário já existe");
        }
        console.log(err);
        res.status(500).send(err);
    }
}

export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.readByEmail(email);
        //console.log(user, password)
        if (!user) {
            return res.status(401).json("Usuário ou senha inválidos");
        }

        if (await bcrypt.compare(password, user.password)) {
            //lembrar de criar .env
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            ); //token de acesso

            //separando senha das informações de usuário
            const { password: pass, ...validUser } = user;

            return res.json({ User: validUser, token });
        }
        return res.status(401).json("Usuário ou senha inválidos");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export async function forgotPassword(req, res, next) {
    const email = req.body.email;

    try {
        //verificar se exste esse usuário que pediu a senha
        const user = await User.readByEmail(email);
        if (!user) {
            return res.status(404).json("Nenhum usuário encontrado");
        }

        //verificar se ja existe um token de recuperação de senha
        const DbToken = await Token.readByUserId(user.id);
        console.log(DbToken);
        if (DbToken) {
            // -- JV --
            const now = new Date();
            //caso não, verificar se foi adicionado a menos de 3 minutos
            //o usuário deve esperar no minimo este tempo para pedir outro token
            //boas praticas
            if (DbToken.createdAt.getTime() + 180000 > now.getTime()) {
                return res
                    .status(400)
                    .json("Aguarde 3 minutos para enviar email novamente.");
            }
            //caso tenha passado o tempo, deletar o token antigo
            await Token.deleteOne(DbToken.id);
        }

        //cria token
        const token = crypto.randomBytes(32).toString("hex");
        const url = `${process.env.CLIENT_URL}/redefine-password?tt=${token}&usr=${user.id}`;

        //salva o token
        await Token.create(user.id, token);

        //envio de email
        await sendMail(user.email, "Recuperação de senha", url);

        res.status(200).json("Email enviado");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export async function resetPasswordByToken(req, res) {
    const data = req.body;
    try {
        if (req.token.userId !== parseInt(data.userId)) {
            return res
                .status(401)
                .json({ auth: false, message: "Token inválido" });
        }

        const hashedPasswd = await bcrypt.hash(data.password, saltRounds);

        await User.updatePassword(hashedPasswd, parseInt(data.userId));
        await Token.deleteByUserId(parseInt(data.userId));

        res.status(200).json({
            auth: true,
            message: "Senha alterada com sucesso",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
