const express = require('express');
const { loginLimiter, signupLimiter } = require('../utils/rateLimiters');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authValidation = require('../validations/authValidation');

//api/v1/users/

// Normal user sign up route
router.post(
  '/signup',
  signupLimiter,
  validateRequest(authValidation.signupSchema),
  authController.signup,
);

// User login in route
router.post(
  '/login',
  loginLimiter,
  validateRequest(authValidation.loginSchema),
  authController.login,
);

// User login in using OpenID connect(OAuth) route
router.post(
  '/auth/google',
  loginLimiter,
  validateRequest(authValidation.googleLoginSchema),
  authController.googleLogin,
);

// Forget password Route
router.post(
  '/forgotPassword',
  loginLimiter,
  validateRequest(authValidation.forgotPasswordSchema),
  authController.forgotPassword,
);

// Reset password Route
router.patch(
  '/resetPassword/:token',
  validateRequest(authValidation.resetPasswordSchema),
  authController.resetPassword,
);

// Update Password Route
router.patch(
  '/updateMyPassword',
  authController.protect,
  validateRequest(authValidation.updatePasswordSchema),
  authController.updatePassword,
);

// Update User
router.patch(
  '/updateMe',
  authController.protect,
  validateRequest(authValidation.updateMeSchema),
  userController.updateMe,
);

// Delete User
router.delete('/deleteMe', authController.protect, authController.deleteUser);

// Routes for system Admins
// TODO:apply authController.protect and authController.restrictTo('admin') middlewares
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
