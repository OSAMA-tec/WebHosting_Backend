const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./route/userRoute');
const cors = require('cors');

const app = express();

connectDB();

const corsOptions = {
  origin: '*', // Allow any origin
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

app.use('/api/users', userRoute);

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
