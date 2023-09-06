const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true, 
    sparse: true,
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
  packageName:{
    type:String,
  },
  DomainName:{
    type:String,
  },
  DomainName:{
    type:String,
  },
  verified:{
    type:Boolean,
  }
});

const userSchema = mongoose.model('User', UserSchema);

module.exports = userSchema;