import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'

import VerifyEmailInputBox from './VerifyEmailInputBox';

import { useAuthStore } from "../../store/AuthStore";

const VerifyEmailForm = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isComplete, setIsComplete] = useState(false);

  const { verifyEmail, isLoading } = useAuthStore();

  const handleCodeChange = (newCode) => {
    setVerificationCode(newCode);
    setIsComplete(newCode.every(char => char !== ''));
  };

  useEffect(() => {
    if (isComplete && !isLoading) {
      handleEmailVerify();
    }
  }, [isComplete]);

  const handleEmailVerify = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const code = verificationCode.join('');

    if(code.length !== 6 || !isComplete) {
      return toast.error('Verification code must be 6 characters.');
    }

    try {
      await verifyEmail(code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleEmailVerify}>
      <VerifyEmailInputBox
        code={verificationCode}
        onCodeChange={handleCodeChange}
      />
      <div className="form-control pt-3">
        {isLoading ?
          <Loader className=' animate-spin mx-auto' size={24} /> :
          <button className="btn btn-base btn-outline rounded-md shadow-xl" type="submit">Verify</button>
        }
      </div>
    </form>
  );
};

export default VerifyEmailForm;