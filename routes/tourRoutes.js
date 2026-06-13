const express = require('express');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.use('/:tourId/reviews', reviewRouter);

router.route('/').get(tourController.getAllTours);
router.route('/:id').get(tourController.getTour);

router.use(
  authController.protect,
  authController.restrictTo('admin', 'lead-guide'),
);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router.route('/').post(tourController.createTour);

router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
