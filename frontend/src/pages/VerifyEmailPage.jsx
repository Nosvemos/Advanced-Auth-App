import React from 'react';

import { useAuthStore } from '../store/AuthStore.js'

import VerifyEmailForm from '../components/forms/VerifyEmailForm.jsx'
import Card from '../components/Card.jsx'

const VerifyEmailPage = () => {
  const { user, resendEmail } = useAuthStore();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        Title="Verify Email"
        Form={<VerifyEmailForm />}
      >
        <p className="text-center">
          <span>Did not you get an e-mail?</span>
          <button
            className="link rounded-md shadow-xl ml-1"
            onClick={() => resendEmail(user?.email)}
          >
            Resend it
          </button>
        </p>
      </Card>
    </div>
  );
}

export default VerifyEmailPage;