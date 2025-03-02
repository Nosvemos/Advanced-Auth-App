import express from 'express';

import requestLimiter from '../middlewares/requestLimiter.js'

import { signup, login, logout, verifyEmail, resendEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js'

import {
  signupValidation, loginValidation, verifyEmailValidation, resendEmailValidation, resetPasswordValidation, forgotPasswordValidation,
} from '../middlewares/validators/authValidators.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/signup', requestLimiter, signupValidation, signup);

router.post('/login', requestLimiter, loginValidation, login);

router.post('/logout', verifyToken, logout);

router.post('/verify-email', verifyToken, requestLimiter, verifyEmailValidation, verifyEmail);

router.post('/resend-email', verifyToken, requestLimiter, resendEmailValidation, resendEmail);

router.post('/forgot-password', requestLimiter, forgotPasswordValidation, forgotPassword);

router.post('/reset-password/:token', requestLimiter, resetPasswordValidation, resetPassword);

router.get('/check-auth', verifyToken, checkAuth)

export default router;