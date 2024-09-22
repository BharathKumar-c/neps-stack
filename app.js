const dotenv = require('dotenv');
const express = require('express');
const authRouter = require('./routes/authRoutes');

const app = express();
dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'wooho! REST APIs are working',
  });
});

/* all routes will be here */
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log('Server up and running', PORT);
});
