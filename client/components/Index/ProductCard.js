import { Card, Avatar } from 'antd';

import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	ShoppingCartOutlined,
	HeartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Meta } = Card;
const ProductCard = () => {
	return (
		<Card
			style={{ width: '100% ' }}
			cover={
				<img
					alt='example'
					src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000'
					height='430'
					width='100'
					className='p-4'
				/>
			}
			actions={[
				<HeartOutlined key='heart' />,
				<ShoppingCartOutlined key='shopping-cart' />,
			]}
		>
			<Meta
				title={
					<Link href='/products/test-product-01'>
						<a className='text-dark'>Test Product 01</a>
					</Link>
				}
				description='4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera'
			/>
		</Card>
	);
};

export default ProductCard;
