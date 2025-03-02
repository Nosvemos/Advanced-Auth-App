import React from 'react';
import { Link } from "react-router-dom";

import VerifyEmailForm from './VerifyEmailForm.jsx';

const VerifyEmailCard = () => {
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow shadow-xl px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Email</h2>
        <VerifyEmailForm />
        <div className='divider'></div>
        <p className="text-center">
          <span>Didn't you get an e-mail? ?</span>
          <Link to={"/resend-email"} className="link link-neutral-content ml-1">
            Resend email
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailCard;