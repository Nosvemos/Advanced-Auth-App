import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';

import errorResponse from "../utils/errorResponse.js";
import generateRandomToken from '../utils/generateRandomToken.js'
import { setJwtCookie } from '../utils/setJwtCookie.js'
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/sendEmail.js'

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return next(new errorResponse('Validation failed!', 400, errors.array()));
    }

    const generatedSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const verificationToken = generateRandomToken(6);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    await user.save();
    setJwtCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

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

export const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Successfully logged out!'
  });
};

export const verifyEmail = async (req, res, next) => {
  const { code } = req.body;
  console.log(code);
  try {
    const user = await User.findOne({
      verificationToken: code,
    });
    if (!user) {
      return next(new errorResponse('Invalid code.', 400));
    }
    if(user.verificationExpiresAt <= Date.now()){
      return next(new errorResponse('Expired code.', 400));
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
}