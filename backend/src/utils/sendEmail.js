import { mailtrapClient, mailtrapSender } from '../lib/mailtrap/mailtrap.js'
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from '../lib/mailtrap/emailTemplates.js'

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipientEmail = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: mailtrapSender,
      to: recipientEmail,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
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