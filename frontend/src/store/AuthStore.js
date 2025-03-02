import { create } from 'zustand';
import { toast } from 'react-toastify';

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
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
      toast.success('Your account created successfully.');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set ({ isLoading: false });
    }
  }
}));