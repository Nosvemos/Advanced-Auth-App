import React from 'react';
import { Link } from "react-router-dom";

import LoginForm from './LoginForm.jsx';

const LoginCard = () => {
  return (
    <div className="card card-border w-full max-w-md rounded-xl shadow shadow-xl px-10">
      <div className="card-body items-center text-center">
        <h2 className="text-2xl font-bold text-center mb-4">Login Account</h2>

        <LoginForm />
        <div className='divider'></div>
        <p className="text-center">
          <span>Have you signed up yet?</span>
          <Link to={"/signup"} className="link link-neutral-content ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;