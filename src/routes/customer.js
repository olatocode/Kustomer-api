/** @format */

const express = require('express');
const {
  allCustomer,
  addCustomer,
  getACustomer,
  deleteCustomer,
} = require('../controllers/customerController');
const { authenticate, authorize} = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/customers', authenticate, authorize('admin'), allCustomer);
router.post('/customers', authenticate, addCustomer);
router.get('/customers/:id', authenticate, authorize('admin'), getACustomer);
router.delete('/customers/:id', authenticate, authorize('admin'), deleteCustomer);

module.exports = router;


