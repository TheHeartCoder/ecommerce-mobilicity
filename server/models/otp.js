const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otpSchema = new Schema({
  user: {
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
    expires: 10 * 60, // this is the expiry time in seconds = 10 minutes
  },
});
module.exports = mongoose.model('Otp', otpSchema);
