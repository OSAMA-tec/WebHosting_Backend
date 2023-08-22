const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./route/userRoute');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));