const mongoose = require('mongoose');
 
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5m' },
});
 
const OTPModel = mongoose.model('OTP', OTPSchema);
 
module.exports = OTPModel;