import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const wishlistSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Wishlist', wishlistSchema);
