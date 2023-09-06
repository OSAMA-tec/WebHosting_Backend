const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // Add unique constraint
    sparse: true, // Add sparse option
  },
  password: {
    type: String,
  },
  tempEmail:{
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  otp:{
    type:String,
  },
  verified:{
    type:Boolean,
  }
});

const adminSchema = mongoose.model('Admin', AdminSchema);

module.exports = adminSchema;