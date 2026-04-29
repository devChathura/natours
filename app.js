const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8'),
);
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
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
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((tour) => tour.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }

  const updatedTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = updatedTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  // deletion
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
