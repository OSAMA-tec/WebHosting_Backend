const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  tempEmail:{
    type: String,
  },
  otp:{
    type:String,
  },
  verified:{
    type:Boolean,
  }
});

module.exports = mongoose.model('User', UserSchema);
