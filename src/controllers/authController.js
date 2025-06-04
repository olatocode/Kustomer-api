/** @format */
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, phone_no, email, password, role } = req.body;

    // validate data
    if (!firstname || !lastname || !phone_no || !email || !password) {
      return res.status(404).json({
        status: 'error',
        message: 'All field required',
      });
    }

    //check if user exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        status: 'error',
        message: 'User already exist',
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = await User.create({
      firstname,
      lastname,
      phone_no,
      email,
      password: hashPassword,
      role,
    });

  
    return res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: newUser,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user is found
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    // user and password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    if (!token) {
      return res.status(401).send('Invalid credentials');
    }

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the cookie named 'token'
    res.clearCookie('token', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({
      status: 'success',
      message: 'Logout successful',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
