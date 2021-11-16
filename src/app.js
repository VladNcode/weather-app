const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');
const viewRouter = require('../routes/viewRoutes');

const app = express();

// Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Making pug work
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// Serving static files
app.use(express.static(path.join(__dirname, '../public')));

// Routing
app.use('/', viewRouter);

// Handling errors

app.get('/help/*', (req, res, next) => {
  next(
    new AppError(
      `Article: "${req.originalUrl.slice(6)}" not found on this server`,
      404
    )
  );
});

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
