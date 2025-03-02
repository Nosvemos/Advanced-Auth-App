import { config } from 'dotenv'

import resend from '../lib/resend/config.js'
import {
  PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from '../lib/resend/emailTemplates.js'

config();

const clientUrl = process.env.CLIENT_URL;

export const sendVerificationEmail = async (email, fullName, verificationToken) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{fullName}", fullName).replace("{verificationToken}", verificationToken),
      category: 'Email Verification'
    });
  } catch (error) {
    throw new Error(`Error while sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, fullName) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Welcome!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{fullName}", fullName),
      category: 'Welcome'
    });
  } catch (error) {
    throw new Error(`Error while sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, fullName, verificationToken) => {
  const resetURL = `${clientUrl}/reset-password/${verificationToken}`;
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Reset your password!",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{fullName}", fullName).replace("{resetURL}", resetURL),
    })
  } catch (error) {
    throw new Error(`Error while sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email, fullName) => {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Your password has been reset!",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{fullName}", fullName),
    })
  } catch (error) {
    throw new Error(`Error while sending reset password email: ${error}`);
  }
}