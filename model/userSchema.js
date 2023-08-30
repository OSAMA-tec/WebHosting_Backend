const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  otp:{
    type:String,
  },
  verified:{
    type:Boolean,
  }
});

const userSchema = mongoose.model('userSchema', UserSchema);

module.exports = userSchema;