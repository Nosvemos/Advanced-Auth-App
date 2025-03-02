import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date
}, { timestamps: true });

export const User = await mongoose.model('User', userSchema);