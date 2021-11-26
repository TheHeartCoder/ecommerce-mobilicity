import { useEffect, useState } from 'react';
import { Menu, Modal, Button } from 'antd';
import {
	LoginOutlined,
	MobileOutlined,
	RightSquareOutlined,
	SearchOutlined,
	UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

import Link from 'next/link';
// import { useRouter } from 'next/router';

const NavBar = () => {
	const [current, setCurrent] = useState('');

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	// const router = useRouter();

	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);
	return (
		<>
			<Menu
				mode='horizontal'
				theme='dark'
				selectedKeys={[current]}
				className='mb-1 hide-print'
			>
				<Menu.Item key='/home' onClick={(e) => setCurrent(e.key)}>
					<Link href='/'>
						<a style={{ fontWeight: 'bold', fontSize: '30px' }}>Mobilicity</a>
					</Link>
				</Menu.Item>
				<Menu.Item
					style={{ marginLeft: 'auto' }}
					key='/search'
					onClick={showModal}
					icon={<SearchOutlined />}
				>
					Search
				</Menu.Item>
				<Menu.Item key='/products' icon={<MobileOutlined />}>
					<Link href='/products'>
						<a>Products</a>
					</Link>
				</Menu.Item>
				<Menu.Item
					key='/login'
					icon={<LoginOutlined />}
					onClick={(e) => setCurrent(e.key)}
				>
					<Link href='/login'>
						<a>Log In</a>
					</Link>
				</Menu.Item>
				<Menu.Item
					key='/register'
					icon={<RightSquareOutlined />}
					onClick={(e) => setCurrent(e.key)}
				>
					<Link href='/register'>
						<a>Register</a>
					</Link>
				</Menu.Item>
				<SubMenu key='SubMenu' icon={<UserOutlined />} title='Arindam Paul'>
					<Menu.Item key='setting:1'>
						<Link href='/customer/my-profile'>
							<a>My Profile</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:5'>
						<Link href='/customer/my-addresses'>
							<a>My Addresses</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:2'>
						{' '}
						<Link href='/customer/my-cart'>
							<a>My Cart</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/customer/my-wishlist'>
							<a>My Wishlist</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:4'>
						{' '}
						<Link href='/customer/my-orders'>
							<a>My Orders</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:6'>Log Out</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/admin/category-list'>
							<a>Categories</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/admin/prduct-brands'>
							<a>Brands</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/admin/product-list'>
							<a>Products</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/admin/order-list'>
							<a>Orders</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='setting:3'>
						{' '}
						<Link href='/admin/customer-list'>
							<a>Customers</a>
						</Link>
					</Menu.Item>
				</SubMenu>
			</Menu>

			<Modal
				title='Search Products'
				visible={isModalVisible}
				okText='Search'
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<input
					type='text'
					placeholder='Search Products'
					className='form-control'
				/>
			</Modal>
		</>
	);
};

export default NavBar;
