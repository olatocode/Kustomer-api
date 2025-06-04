const mongoose = require('mongoose');
const paginate = require("mongoose-paginate-v2");

const customerSchema = new mongoose.Schema({
  complainType: {
    type: String,
    enum: ['opay', 'palmpay', 'kuda', 'mtn', 'glo', 'airtel'],
  },
  subject: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

customerSchema.plugin(paginate);
// convert the schema to model
const customerModel = mongoose.model('Customer', customerSchema);

module.exports = customerModel;