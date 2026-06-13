const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.checkReviewOwnership = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  if (req.user.role === 'admin') {
    return next();
  }

  const reviewUserId = review.user.id || review.user.toString();
  if (reviewUserId !== req.user.id) {
    return next(
      new AppError(
        'You do not have permission to edit or delete this review',
        403,
      ),
    );
  }

  next();
});

exports.setTourUserIds = (req, res, next) => {
  // This function mutates the req.body and passes it forward.
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  req.filterObj = filter;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
