import express from "express";
import { register, login, forgotPassword, resetPasswordByToken } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/tokenValidation.js";
import { isValidToken } from "../middleware/tokenPassValidation.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authSchema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
//rota para verificar se o usuário está autenticado, utilizando o token
router.get("/validate", isAuthenticated, (req, res) => {
    res.status(200).json({ message: "OK", isValid: true });
});
//rota para esquecer a senha
router.post("/password-forgot", forgotPassword);
//verificar token da senha esquecida
router.get("/validate-pass-token/:token", isValidToken, (req, res) => {
    res.status(200).json({ message: "OK", isValid: true });
});
//nova senha utilizando token da senha esquecida
router.post("/password-reset", isValidToken, resetPasswordByToken);

export default router;
