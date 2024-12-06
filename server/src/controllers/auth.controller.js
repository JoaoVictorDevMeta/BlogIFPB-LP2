import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const saltRounds = Number(process.env.BCRYPT_SALT); //assumindo valor do Salt

export async function register(req, res) {
  const { name, email, password, course } = req.body; //definindo variaveis que recebemos
  console.log(req.body);

  try {
    const hashedPasswd = await bcrypt.hash(password, saltRounds); //senha criptografada
    const newUser = await User.create({
      name,
      email,
      password: hashedPasswd,
      course,
    }); // adicionando o usuario

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
    if(!user) {
      return res.status(401).json("Usuário ou senha inválidos");
    }

    if (await bcrypt.compare(password, user.password)) {
      //lembrar de criar .env
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }); //token de acesso

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
