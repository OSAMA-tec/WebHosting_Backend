const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
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
