/** @format */
const Customer = require('../models/customerModel');
const sendVerificationEmail = require('../utils/mailer');

// view all posts logic/endpoint
const allCustomer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const result = await Customer.paginate({}, options);

    if (!result.docs.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No customer complain found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'All customer complain retrieved successfully',
      data: result.docs,
      totalComplain: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const addCustomer = async (req, res) => {
  try {
    const { complainType, subject, message } = req.body;
    let email = req.user.email;

    const newCustomer = await Customer.create({
      complainType,
      subject,
      message,
    });

    await sendVerificationEmail(email, subject, complainType, message);

    res.status(201).json({
      status: 'success',
      message: 'Customer complain created successfully',
      data: newCustomer,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getACustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Customer complain not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Customer complain view successfully',
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};


const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  allCustomer,
  addCustomer,
  getACustomer,
  deleteCustomer,
};
