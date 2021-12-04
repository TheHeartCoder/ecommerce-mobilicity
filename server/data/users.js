// import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt';

export const users = [
	{
		name: 'Admin User 1',
		email: 'admin1@example.com',
		password: bcrypt.hashSync('123456', 10),
		role: 'Admin',
	},
	{
		name: 'Admin User 2',
		email: 'admin2@example.com',
		password: bcrypt.hashSync('123456', 10),
		role: 'Admin',
	},
	{
		name: 'Admin User 3',
		email: 'admin3@example.com',
		password: bcrypt.hashSync('123456', 10),
		role: 'Admin',
	},
];
