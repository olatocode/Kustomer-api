/** @format */

const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');
const getAllUser = require('../controllers/userController');
const router = express.Router();

router.post('/users/auth/register', registerUser);
router.post('/users/auth/login', loginUser);
router.post('/users/auth/logout', logoutUser);

router.get('/users', getAllUser);

module.exports = router;
