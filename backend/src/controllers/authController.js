import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';

import errorResponse from "../utils/errorResponse.js";
import generateRandomToken from '../utils/generateRandomToken.js'
import { setJwtCookie } from '../utils/setJwtCookie.js'

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return next(new errorResponse('Validation failed!', 400, errors.array()));
    }

    const generatedSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const verificationToken = generateRandomToken();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    await user.save();
    setJwtCookie(res, user._id);

    const { password: _, ...userDataWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully created!',
      user: userDataWithoutPassword
    })
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {

};

export const logout = async (req, res, next) => {

};