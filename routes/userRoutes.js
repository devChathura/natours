const express = require('express');
const { loginLimiter, signupLimiter } = require('../utils/rateLimiters');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authValidation = require('../validations/authValidation');

router.post(
  '/signup',
  signupLimiter,
  validateRequest(authValidation.signupSchema),
  authController.signup,
);
router.post(
  '/login',
  loginLimiter,
  validateRequest(authValidation.loginSchema),
  authController.login,
);
router.post(
  '/forgotPassword',
  loginLimiter,
  validateRequest(authValidation.forgotPasswordSchema),
  authController.forgotPassword,
);
router.patch(
  '/resetPassword/:token',
  validateRequest(authValidation.resetPasswordSchema),
  authController.resetPassword,
);
router.patch(
  '/updateMyPassword',
  authController.protect,
  validateRequest(authValidation.updatePasswordSchema),
  authController.updatePassword,
);
router.patch(
  '/updateMe',
  authController.protect,
  validateRequest(authValidation.updateMeSchema),
  userController.updateMe,
);
router.delete('/deleteMe', authController.protect, authController.deleteUser);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
