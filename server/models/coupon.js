import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    couponType: {
      type: String,
      enum: ['percentage', 'amount'],
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    minimumOrderAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Coupon', couponSchema);
