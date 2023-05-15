const mongoose = require('mongoose');

// TODO: create user schema
const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true
    },
    fullName: String,
    email: {
      type: String,
      unique: [true, 'email must be unique value'],
      required: [true, 'email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] 
    },
    password: {
      type: String,
      required: true
    },
    address: String,
    phone: {
      type: String,
      pattern: "^01[0125][0-9]{8}$",
      required: true
    },
    confirmedEmail: { 
      type: Boolean, 
      default: false
    },
    deleted: { 
      type: Boolean, 
      default: false
    },
    role: {
      type: String,
      default: 'Customer',
      enum: ['Customer', 'Seller']
    }
});

var User = mongoose.model("Users", UserSchema);
module.exports = User;
