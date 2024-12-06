import express from "express";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import { isAuthenticated } from "../middleware/tokenValidation.js";
import { validate } from "../middleware/validate.js";
import { getUserSchema, updateUserSchema } from "../validators/userSchema.js";

const router = express.Router();
const saltRounds = Number(process.env.BCRYPT_SALT);

//rota para listar todos os usuários
router.get("/all", async (req, res) => {
    try {
        const users = await User.readAll();

        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//rota para buscar um usuário pelo id
router.get("/:id", validate(getUserSchema), async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.readOne(id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//rota para atualizar um usuário pelo id
router.put(
    "/update",
    validate(updateUserSchema),
    isAuthenticated,
    async (req, res) => {
        try {
            const { userData, perfilData } = req.body;
            const id = req.userId;
            let user = {}
            let hashedPasswd = null;

            const { email, password } = userData;
            //como vai se atualizara senha, é necessário encriptografar a nova senha
            //utilizaremos o mesmo método propost no registro
            //nsesse caso vamos defini-la abaixo
            if (password) {
                hashedPasswd = await bcrypt.hash(password, saltRounds);
            }
            //fazendo primeiro no usuario
            //ou seja, nas parte onde há credenciais
            if (email && password) {
                user = await User.updateUser(id, {
                    email,
                    password: hashedPasswd,
                });
            }
            //a seguir no perfil, ou seja
            //informações a mais
            const perfil = await User.updatePerfil(id, perfilData);

            const response = {
                user,
                perfil: perfil.Perfil,
            };
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

//rota para apagar um usuário
router.delete("/delete", isAuthenticated, async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.deleteUser(id);

        res.status(204).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

export default router;
