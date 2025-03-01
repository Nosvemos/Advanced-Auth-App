import express from 'express';

import { signup, login, logout, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController.js'

import {
  signupValidation, loginValidation, verifyEmailValidation, resetPasswordValidation, forgotPasswordValidation,
} from '../middlewares/validators/authValidators.js'

const router = express.Router();

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

router.post('/logout', logout);

router.post('/verify-email', verifyEmailValidation, verifyEmail);

router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

router.post('/reset-password/:token', resetPasswordValidation, resetPassword);

export default router;