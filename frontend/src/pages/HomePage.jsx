import React from 'react'

import { useAuthStore } from "../store/AuthStore";

const HomePage = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='flex flex-col min-h-screen items-center justify-center p-4 space-y-4'>
      <span className='text-center font-bold'>Welcome, {user.fullName}.</span>
      <div>
        <span className='text-center font-bold'>Last login on: </span>
        {
          new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          })
        }
      </div>
      <button className="btn btn-base btn-outline rounded-md shadow-xl" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default HomePage