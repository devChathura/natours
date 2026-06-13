const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// POST /api/v1/reviews
// POST /api/v1/tours/:tourId/reviews

// Public Routes
router
  .route('/')
  .get(reviewController.createFilterObj, reviewController.getAllReviews);
router.route('/:id').get(reviewController.getReview);

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router
  .route('/:id')
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.checkReviewOwnership,
    reviewController.updateReview,
  )
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.checkReviewOwnership,
    reviewController.deleteReview,
  );

module.exports = router;
