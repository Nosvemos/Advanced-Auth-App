import { body } from 'express-validator';
import xss from 'xss';

import { User } from '../../models/User.js'

import errorResponse from "../../utils/errorResponse.js";

export const signupValidation = [
  // Name Validation
  body('name')
  .trim()
  .notEmpty().withMessage('Username is required.')
  .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/).withMessage('Name can only contain letters and spaces.')
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
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$/)
  .withMessage('Password must contain at least: 1 uppercase, 1 lowercase, 1 number and 1 special character')
  .escape()
  .customSanitizer(value => xss(value))
];