const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const { globalLimiter } = require('./utils/rateLimiters');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const sanitizeInputs = require('./utils/sanitize');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL
      : ['http://localhost:3000', 'http://127.0.0.1:5500'],
  credentials: true,
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
app.use('/api', globalLimiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(sanitizeInputs);

// prevent param pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
