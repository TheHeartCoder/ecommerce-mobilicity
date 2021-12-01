const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  resetPasswordOtp: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});
module.exports = mongoose.model('Otp', otpSchema);
