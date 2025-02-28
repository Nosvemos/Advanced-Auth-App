import express from 'express';

import { signup, login, logout, verifyEmail } from '../controllers/authController.js'

import { signupValidation } from '../middlewares/validators/authValidators.js';

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

export default router;