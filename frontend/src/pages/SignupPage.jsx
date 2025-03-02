import React from 'react';
import SignupForm from '../components/forms/SignupForm.jsx'
import Card from '../components/Card.jsx'

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card
        Form= {<SignupForm />}
        Title= 'Create Account'
        Span1= 'Already have an account ?'
        Link1= './login'
        LinkText1= 'Log in'
      />
    </div>
  );
};

export default SignupPage;