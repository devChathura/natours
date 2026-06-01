const { rateLimit, ipKeyGenerator } = require('express-rate-limit');

exports.globalLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

exports.loginLimiter = rateLimit({
  max: 7,
  windowMs: 15 * 60 * 1000,
  keyGenerator: (req, res) => {
    if (req.body && req.body.email) return req.body.email.toLowerCase();
    return ipKeyGenerator(req, res);
  },
  message:
    'Too many attempts with this email/IP, please try again in 15 minutes!',
});

exports.signupLimiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many accounts created from this IP, please try again in an hour.',
});
