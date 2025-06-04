/** @format */

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const customerRoute = require('./routes/customer');
const userRoute = require('./routes/user');

const connectDB = require('./database/db');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const PORT = process.env.PORT;

connectDB();
// base url
app.get('/', (req, res) => {
  res.send({ data: 'Welcome To Kustomer Api' });
});

// versioning
app.use('/api/v1', customerRoute);
app.use('/api/v1', userRoute);

app.listen(PORT, () => {
  console.log(`Server connected to http://localhost:${PORT}`);
});

