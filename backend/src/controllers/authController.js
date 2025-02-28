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
      const error = new Error('Validation failed');
      error.statusCode = 400;
      error.errors = errors.array(); // Hata detaylarını ekle
      throw error; // veya next(error)
    }

    if(!name || !email || !password) {
      throw new errorResponse('All fields are required.', 400);
    }

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
      throw new errorResponse('User already exists!', 400);
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

    const userDataWithoutPassword = user.toObject();
    delete userDataWithoutPassword.password; // Exclude password from the response

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