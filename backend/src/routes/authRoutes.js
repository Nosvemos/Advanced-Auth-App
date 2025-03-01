import express from 'express';

import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js'

import {
  signupValidation, loginValidation, verifyEmailValidation, resetPasswordValidation, forgotPasswordValidation,
} from '../middlewares/validators/authValidators.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmailValidation, verifyEmail);

router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

router.post('/reset-password/:token', resetPasswordValidation, resetPassword);

router.get('/check-auth', verifyToken, checkAuth)

export default router;