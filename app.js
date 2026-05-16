const express = require('express');

const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
