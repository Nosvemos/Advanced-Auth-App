import React from 'react';
import Card from '../components/Card';
import LoginForm from '../components/forms/LoginForm.jsx'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        Form= {<LoginForm />}
        Title= 'Login Account'
        Link1= './forgot-password'
        LinkText1= 'Forgot password?'
        Span2= 'Have you signed up yet?'
        Link2= './signup'
        LinkText2= 'Sign up'
      />
    </div>
  );
};

export default LoginPage;