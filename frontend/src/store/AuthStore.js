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

  verifyEmail: async (code) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`/auth/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true });
      toast.success('Your email verified successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get(`/auth/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));