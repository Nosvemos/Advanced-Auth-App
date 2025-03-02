import { body, param } from 'express-validator';
import xss from 'xss';

import { User } from '../../models/User.js';

import errorResponse from "../../utils/errorResponse.js";

export const signupValidation = [
  // Full name Validation
  body('fullName')
  .trim()
  .notEmpty().withMessage('Full name is required.')
  .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/).withMessage('Full name can only contain letters and spaces.')
  .customSanitizer(value => xss(value)),

  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Please enter a valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value))
  .custom(async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new errorResponse('User already exists!', 400);
    }
    return true;
  }),

  // Password Validation
  body('password')
  .trim()
  .notEmpty().withMessage('Password is required.')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character.')
  .customSanitizer(value => xss(value))
];

export const loginValidation = [
  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Please enter a valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value)),

  // Password Validation
  body('password')
  .trim()
  .notEmpty().withMessage('Password is required.')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character.')
  .customSanitizer(value => xss(value))
];

export const verifyEmailValidation = [
  // Code Validation
  body('code')
  .trim()
  .notEmpty().withMessage('Code is required.')
  .isLength({ min: 6, max: 6 }).withMessage('Code must be exactly 6 characters.')
  .matches(/^[A-Z0-9]+$/)
  .withMessage('Code must contain only uppercase letters and numbers.')
  .customSanitizer(value => xss(value))
];

export const resendEmailValidation = [
  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Not valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value)),
];

export const forgotPasswordValidation = [
  // Email Validation
  body('email')
  .trim()
  .notEmpty().withMessage('Email is required.')
  .isEmail().withMessage('Please enter a valid email address.')
  .normalizeEmail()
  .customSanitizer(value => xss(value)),
];

export const resetPasswordValidation = [
  // Token Validation
  param('token')
  .trim()
  .notEmpty().withMessage('Token is required.')
  .isLength({ min: 20, max: 20 }).withMessage('Token must be exactly 20 characters.')
  .matches(/^[a-z0-9]+$/)
  .withMessage('Code must contain only lowercase letters and numbers.')
  .customSanitizer(value => xss(value)),

  // Password Validation
  body('password')
  .trim()
  .notEmpty().withMessage('Password is required.')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]+$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character.')
  .customSanitizer(value => xss(value)),

  // Confirm Password Validation
  body('confirmPassword')
  .trim()
  .notEmpty().withMessage('Confirm password is required.')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new errorResponse('Confirm password does not match.', 400);
    }
    return true;
  })
  .customSanitizer(value => xss(value))
];

export const resetTokenValidation = [
  body('token')
  .trim()
  .notEmpty().withMessage('Token is required.')
  .isLength({ min: 20, max: 20 }).withMessage('Token must be exactly 20 characters.')
  .matches(/^[a-z0-9]+$/)
  .withMessage('Code must contain only lowercase letters and numbers.')
  .customSanitizer(value => xss(value)),
];