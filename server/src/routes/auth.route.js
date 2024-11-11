import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/tokenValidation.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/validate', isAuthenticated, (req, res)=>{
    res.status(200).json({message: 'OK', isValid: true})
})

export default router