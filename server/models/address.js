import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const addressSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    pinNo: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    phoneNo2: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Address', addressSchema);
