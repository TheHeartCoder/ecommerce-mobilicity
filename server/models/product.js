import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;
const productSchema = new Schema(
	{
		slug: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		color: {
			type: String,
			trim: true,
			required: true,
		},
		category: {
			type: ObjectId,
			ref: 'Category',
		},
		brand: { type: ObjectId, ref: 'Brand' },
		highlightDescription: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		featured: { type: Boolean, default: false },
		quantity: { type: Number, default: 0 },
		images: [],
	},
	{ timestamps: true }
);

export default mongoose.model('productSchema', Product);
