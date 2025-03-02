import { useEffect } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import { Loader } from 'lucide-react';

import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import VerifyEmailPage from './pages/VerifyEmailPage.jsx'

import { useAuthStore } from "./store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return user.isVerified
      ? <Navigate to='/' replace />
      : <Navigate to='/verify-email' replace />;
  }

  return children;
};

const VerifyEmailRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignupPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/verify-email'
          element={
            <VerifyEmailRoute>
              <VerifyEmailPage />
            </VerifyEmailRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ToastContainer
        toastClassName={'!bg-base-100 !shadow-xl !text-base-content/80'}
        position="top-center"
        autoClose={3000}
      />
    </div>
  )
}

export default App