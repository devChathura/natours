const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8'),
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.error('Error writing file', err);
        return;
      }
      console.log('File written successfully');
    },
  );
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((tour) => tour.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  const updatedTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = updatedTour;

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: 'error', message: 'Could not save file' });

      res.status(200).json({
        status: 'success',
        data: { tour: updatedTour },
      });
    },
  );
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  // deletion
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
