const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
  });
};
exports.updateTour = (req, res) => {};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
