import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bannerSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
      unique: true,
    },
    image: {},
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
