import React from 'react';

import VerifyEmailForm from './VerifyEmailForm.jsx';

import { useAuthStore } from '../../store/AuthStore.js'

const VerifyEmailCard = () => {
  const { user, resendEmail } = useAuthStore();

  const handleResendEmail = () => {
    resendEmail(user.email);
  };
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow shadow-xl px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Verify Email</h2>
        <VerifyEmailForm />
        <div className='divider'></div>
        <p className="text-center">
          <span>Didn't you get an e-mail? ?</span>
          <button className="link rounded-md shadow-xl ml-1" onClick={handleResendEmail}>Resend email</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailCard;