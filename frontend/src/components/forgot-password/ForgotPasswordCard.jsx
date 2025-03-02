import React from 'react';
import { Link } from "react-router-dom";

import ForgotPasswordForm from './ForgotPasswordForm.jsx';

const ForgotPasswordCard = () => {
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow shadow-xl px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <ForgotPasswordForm />
        <div className='divider'></div>
        <p className="text-center">
          <span>Did you remember your password ?</span>
          <Link to={"/login"} className="link link-neutral-content ml-1">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;