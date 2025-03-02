import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (fullName, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/signup`, { fullName, email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      toast.success('Your account created successfully, please verify your email.');
      return response?.data.success;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/login`, { email, password });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      toast.success('You logged in successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/auth/logout`);
      set({ user: null, isAuthenticated: false });
      toast.success('You logged out successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true });
      toast.success('Your email verified successfully.');
      return response?.data.success;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  resendEmail: async (email) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/auth/resend-email`, { email });
      toast.success('Your email resent successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post(`/auth/forgot-password`, { email });
      toast.success('Password reset email sent to your email successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  resetPassword: async (token, password, confirmPassword) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password, confirmPassword });
      toast.success('Your password has been changed successfully.');
      return response?.data.success;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      await axiosInstance.get(`/auth/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));