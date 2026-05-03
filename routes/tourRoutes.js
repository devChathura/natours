// What we get when run: const tourController = require('./tourController');

// {
//   getAllTours: [Function (anonymous)],
//   getTour: [Function (anonymous)],
//   createTour: [Function (anonymous)],
//   updateTour: [Function (anonymous)],
//   deleteTour: [Function (anonymous)]
// }

const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};    

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
