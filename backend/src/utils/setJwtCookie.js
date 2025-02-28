import jwt from 'jsonwebtoken';

export const setJwtCookie = (res, userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d" // 3 days
  });

  res.cookie('jwtToken', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
  });

  return jwtToken;
}