import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';

import FormInput from '../inputs/FormInput.jsx';

import { useAuthStore } from "../../store/AuthStore.js";

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { forgotPassword, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(formData.email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleForgotPassword}>
      <FormInput
        icon={<Mail/>}
        type="email"
        name="email"
        placeholder="Email Address"
        required='required'
        validatorHint='Enter valid email address.'
        validatorHidden='hidden'
        onChange={handleChange}
        disabled={isLoading}
      />
      <div className="form-control pt-6">
        {isLoading ?
          <Loader className=' animate-spin mx-auto' size={24} /> :
          <button className="btn btn-base btn-outline rounded-md shadow-xl" type="submit">Send Request</button>
        }
      </div>
    </form>
  );
};

export default ForgotPasswordForm;