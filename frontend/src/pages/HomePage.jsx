import React from 'react'

import { useAuthStore } from "../store/AuthStore";

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <span className='text-center font-bold'>You are successfully logged in.</span>
      <button className="btn btn-base btn-outline rounded-md shadow-xl" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage