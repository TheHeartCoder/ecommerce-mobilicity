import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users } from './data/users';
// import products from './data/products.js';
import User from './models/user';
// import Product from './models/productModel.js';
// import Order from './models/orderModel.js';
import { dbConnect } from './config/dbConnect.js';
import { hashPassword } from './utils/auth';

dotenv.config();

dbConnect();

const importData = async () => {
	try {
		// await Order.deleteMany();
		// await Product.deleteMany();
		await User.deleteMany({ role: 'Admin' });
		if (users.length > 3) {
			console.error(`Max 3 persons can be added as admin`);
			process.exit(1);
		}

		const createdUsers = await User.insertMany(users);

		// const adminUser = createdUsers[0]._id;

		// const sampleProducts = products.map((product) => {
		//   return { ...product, user: adminUser };
		// });

		// await Product.insertMany(sampleProducts);

		console.log('Data Imported!');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// await Order.deleteMany();
		// await Product.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed!');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
