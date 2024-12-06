import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/tokenValidation.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/authSchema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/validate", isAuthenticated, (req, res) => {
    res.status(200).json({ message: "OK", isValid: true });
});

export default router;
