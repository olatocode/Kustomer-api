/** @format */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    // throw error;
  }
};

module.exports = connectDB;
