import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Lock, Loader } from 'lucide-react';
import { toast } from 'react-toastify'

import FormInput from '../inputs/FormInput.jsx';

import { useAuthStore } from "../../store/AuthStore.js";
import PasswordStrengthMeter from '../PasswordStrengthMeter.jsx'

const ResetPasswordCard = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isValidToken, setIsValidToken] = useState(false);
  const { token } = useParams();

  const { resetPassword, validateResetToken, isLoading } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateResetToken(token);
      if (isValid) {
        setIsValidToken(true);
      } else {
        navigate('/forgot-password');
      }
    };

    checkToken();
  }, [token, navigate, validateResetToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      return toast.error('Confirm passwords do not match.');
    }

    try {
      const response = await resetPassword(token, formData.password, formData.confirmPassword);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loader className="size-10 animate-spin" />
  }

  if (!isValidToken) {
    return null;
  }

  return (
    <form className="w-full" onSubmit={handleResetPassword}>
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
      <FormInput
        icon={<Lock/>}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
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
          <button className="btn btn-base btn-outline rounded-md shadow-xl" type="submit">Save</button>
        }
      </div>
    </form>
  );
};

export default ResetPasswordCard;