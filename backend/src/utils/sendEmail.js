import { config } from 'dotenv'

import { mailtrapClient, mailtrapSender } from '../lib/mailtrap/mailtrap.js'
import {
  PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from '../lib/mailtrap/emailTemplates.js'

config();

const clientUrl = process.env.CLIENT_URL;

export const sendVerificationEmail = async (email, name, verificationToken) => {
  const recipientEmail = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipientEmail,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{name}", name).replace("{verificationToken}", verificationToken),
      category: 'Email Verification'
    });
    if(!response?.success){
      throw new Error(`Email couldn't send, please try again later.`);
    }
  } catch (error) {
    throw new Error(`Error while sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipientEmail = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipientEmail,
      subject: "Welcome!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
      category: 'Welcome'
    });
    if(!response?.success){
      throw new Error(`Email couldn't send, please try again later.`);
    }
  } catch (error) {
    throw new Error(`Error while sending welcome email: ${error}`);
  }
};

export const sendResetPasswordEmail = async (email, name, verificationToken) => {
  const recipientEmail = [{ email }];
  const resetURL = `${clientUrl}/reset-password/${verificationToken}`;
  try {
    const response = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipientEmail,
      subject: "Reset your password!",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{name}", name).replace("{resetURL}", resetURL),
    })
  } catch (error) {
    throw new Error(`Error while sending reset password email: ${error}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email, name) => {
  const recipientEmail = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipientEmail,
      subject: "Your password has been reset!",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{name}", name),
    })
  } catch (error) {
    throw new Error(`Error while sending reset password email: ${error}`);
  }
}