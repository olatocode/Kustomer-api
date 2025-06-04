/** @format */

const User = require('../models/userModel');

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = getAllUser;
