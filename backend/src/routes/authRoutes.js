import express from 'express';

import { signup, login, logout, verifyEmail, forgotPassword } from '../controllers/authController.js'

import { signupValidation, loginValidation } from '../middlewares/validators/authValidators.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forgot-password', forgotPassword);

export default router;