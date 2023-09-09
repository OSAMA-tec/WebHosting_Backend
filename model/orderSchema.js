const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  clientName: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  periodName: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  domainName: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['On Hold', 'Accept Order', 'Reject Order'],
    default: 'On Hold',
    required: true
  }
});

module.exports = mongoose.model('Order', OrderSchema);
