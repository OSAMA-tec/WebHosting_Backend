const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentPlanSchema = new Schema({
    name: {
        type: String,
        enum: ['Basic', 'Premium', 'Advanced'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const PaymentPlan = mongoose.model('PaymentPlan', PaymentPlanSchema);

module.exports = PaymentPlan;
