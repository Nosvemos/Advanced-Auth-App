import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1055555555, // 5 requests per each IP
  message: 'Too many attempts, please try again later.'
});

export default authLimiter;