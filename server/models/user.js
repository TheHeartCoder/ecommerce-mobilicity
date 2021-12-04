import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		role: {
			type: String,
			default: 'Customer',
			enum: ['Admin', 'Customer'],
		},
		stripe_account_id: '',
		stripe_seller: {},
		stripeSession: {},
		status: { type: String, default: 'inactive', enum: ['active', 'inactive'] },
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema);
