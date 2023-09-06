const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  packageName: {
    type: String,
    enum: ['cPanel Hosting', 'Shared Hosting', 'Business Hosting'],
  },
  domainName: {
    type: String,
  },
  packagePrice: {
    type: Number,
  },
  period: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Package', PaymentSchema);
