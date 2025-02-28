import crypto from 'crypto';

const generateRandomToken = (length= 20, uppercase = true) => {
  let token = crypto.randomBytes(length).toString('hex').slice(0, length);
  return uppercase ? token.toUpperCase() : token;
};

export default generateRandomToken;