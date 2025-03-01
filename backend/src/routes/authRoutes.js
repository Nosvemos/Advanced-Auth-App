import express from 'express';
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per each IP
  message: 'Too many attempts, please try again later.'
});

import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js'

import {
  signupValidation, loginValidation, verifyEmailValidation, resetPasswordValidation, forgotPasswordValidation,
} from '../middlewares/validators/authValidators.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/signup', authLimiter, signupValidation, signup);

router.post('/login', authLimiter, loginValidation, login);

router.post('/logout', verifyToken, logout);

router.post('/verify-email', authLimiter, verifyEmailValidation, verifyEmail);

router.post('/forgot-password', authLimiter, forgotPasswordValidation, forgotPassword);

router.post('/reset-password/:token', authLimiter, resetPasswordValidation, resetPassword);

router.get('/check-auth', verifyToken, checkAuth)

export default router;