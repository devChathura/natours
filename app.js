const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
