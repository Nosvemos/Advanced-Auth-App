import React from 'react';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm.jsx'
import Card from '../components/Card.jsx'

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        Form= {<ForgotPasswordForm />}
        Title= 'Forgot Password'
        Span1= 'Did you remember your password ?'
        Link1= './login'
        LinkText1= 'Log in'
      />
    </div>
  );
};

export default ForgotPasswordPage;