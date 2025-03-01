import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { User } from '../models/User.js';

import errorResponse from "../utils/errorResponse.js";
import generateRandomToken from '../utils/generateRandomToken.js'
import { setJwtCookie } from '../utils/setJwtCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetPasswordSuccessEmail } from '../utils/sendEmail.js'

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

    await sendVerificationEmail(user.email, user.name, verificationToken);

    const { password: _, ...userDataWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully created!',
      user: userDataWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return next(new errorResponse('Validation failed!', 400, errors.array()));
    }

    const user = await User.findOne({email});
    if (!user) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    setJwtCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    const { password: _, ...userDataWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully logged in!',
      user: userDataWithoutPassword
    });
  } catch (error) {
    next(error);
  }
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

    const { password: _, ...userDataWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: userDataWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return next(new errorResponse('There is no account related to this email.', 400));
    }

    user.resetPasswordToken = generateRandomToken(20, false);
    user.resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000 // 1 hour

    await user.save();

    await sendResetPasswordEmail(user.email, user.name, user.resetPasswordToken);

    const { password: _, ...userDataWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user: userDataWithoutPassword
    });

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
    });
    if (!user) {
      return next(new errorResponse('Invalid code.', 400));
    }
    if(user.resetPasswordExpiresAt <= Date.now()){
      return next(new errorResponse('Expired code.', 400));
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save()

    await sendResetPasswordSuccessEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Password reset successfully!"
    });
  } catch (error) {

  }
};