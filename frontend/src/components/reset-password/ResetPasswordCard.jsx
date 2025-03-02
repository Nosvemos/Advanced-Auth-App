import React from 'react';
import { Link } from "react-router-dom";

import ResetPasswordForm from './ResetPasswordForm.jsx';

const ResetPasswordCard = () => {
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow shadow-xl px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordCard;