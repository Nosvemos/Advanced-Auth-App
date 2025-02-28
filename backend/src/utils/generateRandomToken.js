import crypto from 'crypto';

const generateRandomToken = (length= 20) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

export default generateRandomToken;