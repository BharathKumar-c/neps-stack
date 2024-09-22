const dotenv = require('dotenv');
const express = require('express');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const {globalErrorHandler} = require('./controllers/errorController');
const authRouter = require('./routes/authRoutes');

const app = express();
dotenv.config();
app.use(express.json());

/* all routes will be here */
app.use('/api/v1/auth', authRouter);

app.use(
  '*',
  catchAsync(async (req, res, next) => {
    throw new AppError(`can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log('Server up and running', PORT);
});
