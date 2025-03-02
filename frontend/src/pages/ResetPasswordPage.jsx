import React from 'react';
import ResetPasswordForm from '../components/forms/ResetPasswordForm.jsx'
import Card from '../components/Card.jsx'

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        Form= {<ResetPasswordForm />}
        Title= 'Reset Password'
      />
    </div>
  );
};

export default ResetPasswordPage;