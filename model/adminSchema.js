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
  otp:{
    type:String,
  },
  verified:{
    type:Boolean,
  }
});

const adminSchema = mongoose.model('adminSchema', AdminSchema);

module.exports = adminSchema;