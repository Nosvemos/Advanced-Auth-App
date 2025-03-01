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
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const emailVerificationToken = generateRandomToken(6);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken: emailVerificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
    });

    await user.save();
    setJwtCookie(res, user._id);

    await sendVerificationEmail(user.email, user.name, emailVerificationToken);

    const { password, verificationToken, resetPasswordToken, ...safeUser } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully created!',
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return next(new errorResponse('Invalid credentials.', 400));
    }

    if (!user.isVerified) {
      return next(new errorResponse('Email not verified.', 403));
    }

    user.lastLogin = new Date();
    await user.save();

    setJwtCookie(res, user._id);

    const { password, verificationToken, resetPasswordToken, ...safeUser } = user.toObject();

    res.status(201).json({
      success: true,
      message: 'User successfully logged in!',
      user: safeUser
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const user = await User.findOne({
      verificationToken: code
    });
    if (!user) {
      return next(new errorResponse('Invalid code.', 400));
    }
    if(user.verificationTokenExpiresAt <= Date.now()){
      return next(new errorResponse('Expired code.', 400));
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    const { password, verificationToken, resetPasswordToken, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: safeUser
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    let safeUser = null;

    const user = await User.findOne({
      email
    });
    if (user) {
      user.resetPasswordToken = generateRandomToken(20, false);
      user.resetPasswordTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await user.save();

      await sendResetPasswordEmail(user.email, user.name, user.resetPasswordToken);

      safeUser = { ...user.toObject() };
      delete safeUser.password;
      delete safeUser.verificationToken;
      delete safeUser.resetPasswordToken;
    }

    res.status(200).json({
      success: true,
      message: "Password reset request send successfully",
      user: safeUser
    });

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new errorResponse('Validation failed!', 400, errors.array()));
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
    });
    if (!user) {
      return next(new errorResponse('Invalid code.', 400));
    }
    if(user.resetPasswordTokenExpiresAt <= Date.now()){
      return next(new errorResponse('Expired code.', 400));
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save()

    await sendResetPasswordSuccessEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Password reset successfully!"
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(new errorResponse('Invalid user id!', 403));
    }

    const { password, verificationToken, resetPasswordToken, ...safeUser } = user.toObject();

    res.status(200).json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    next (error);
  }
};