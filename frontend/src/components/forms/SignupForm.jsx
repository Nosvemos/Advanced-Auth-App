import React, { useState } from 'react';
import { User, Mail, Lock, Loader } from 'lucide-react';

import FormInput from '../inputs/FormInput.jsx';
import PasswordStrengthMeter from "../PasswordStrengthMeter.jsx";

import { useAuthStore } from "../../store/AuthStore.js";
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const { signup, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formData.fullName, formData.email, formData.password);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSignUp}>
      <FormInput
        icon={<User/>}
        type="text"
        name="fullName"
        placeholder="Full Name"
        pattern="[A-Za-z\s]+"
        minlength="3"
        maxlength="30"
        required='required'
        title="Must be more than 3 and less than 30 characters, including only letters."
        validatorHint='Enter valid full name.'
        validatorHidden='hidden'
        onChange={handleChange}
        disabled={isLoading}
      />

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

      <FormInput
        icon={<Lock/>}
        type="password"
        name="password"
        placeholder="Password"
        minLength='8'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$"
        required='required'
        title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        validatorHint='Enter valid password.'
        validatorHidden='hidden'
        onChange={handleChange}
        disabled={isLoading}
      />

      <PasswordStrengthMeter password={formData.password} />
      <div className="form-control pt-6">
        {isLoading ?
          <Loader className=' animate-spin mx-auto' size={24} /> :
          <button className="btn btn-base btn-outline rounded-md shadow-xl" type="submit">Sign up</button>
        }
      </div>
    </form>
  );
};

export default SignupForm;