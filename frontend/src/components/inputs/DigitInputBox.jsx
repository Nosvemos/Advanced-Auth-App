import React, { useRef } from 'react';

const DigitInputBox = ({ code, onCodeChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (!/^[a-zA-Z0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(0, 1).toUpperCase();

    onCodeChange(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (!/^[a-zA-Z0-9]+$/.test(pastedData)) return;

    const characters = pastedData.slice(0, 6).split('');
    const newCode = [...code];

    characters.forEach((char, index) => {
      if (index < 6) newCode[index] = char.toUpperCase();
    });

    onCodeChange(newCode);

    if (characters.length < 6) {
      inputRefs.current[characters.length].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mb-6">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength="1"
          className="input input-bordered w-12 h-12 text-center text-xl"
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
        />
      ))}
    </div>
  );
};

export default DigitInputBox;