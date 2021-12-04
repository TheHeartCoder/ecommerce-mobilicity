import mongoose from 'mongoose';
const { Schema } = mongoose;

const catSchema = new Schema(
	{
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {},
	},
	{ timestamps: true }
);

export default mongoose.model('Category', catSchema);
