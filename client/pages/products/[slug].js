import HeadText from '../../components/HeadText';

import { Button, Card, List, Avatar, Rate, Progress, Image } from 'antd';
import {
	ShoppingCartOutlined,
	HeartOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import ProductCarousel from '../../components/Index/ProductCarousel';
const data = [
	{
		value: 5,
	},
	{
		value: 3,
	},
	{
		value: 2.5,
	},
	{
		value: 3.5,
	},
	{
		value: 4.5,
	},
];

const responsiveForProductImages = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 1,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};
const Product = () => {
	return (
		<>
			{' '}
			<HeadText
				headText='Product Details'
				subText={`Specification/Details of Product A is showing here. If you like then feel free to buy.`}
			/>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 p-4'>
						<Card style={{ width: '100% ' }}>
							<Image
								style={{ width: '100%' }}
								src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
							/>
							{/* </div> */}
							<div className='d-flex justify-content-center'>
								<img
									src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000'
									style={{ height: '80px', width: '80px', cursor: 'pointer' }}
									alt=''
								/>

								<img
									src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000'
									style={{ height: '80px', width: '80px', cursor: 'pointer' }}
									alt=''
								/>
								<img
									src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000'
									style={{ height: '80px', width: '80px', cursor: 'pointer' }}
									alt=''
								/>
							</div>
							<br />
						</Card>
					</div>
					<br />
					<div className='col-md-6 p-4'>
						<Card style={{ width: '100% ' }}>
							<h2 className=''>
								Test Product 001{' '}
								<Rate allowHalf defaultValue={4.5} disabled={true} />{' '}
								<span style={{ fontSize: '10px' }}>(495 reviews)</span>
							</h2>
							<p
								className='text-info p-1'
								style={{ border: '1px solid #b8b8e0' }}
							>
								<strong style={{ color: '#6161c2' }}>Brand :</strong> Apple
								<br />
								<strong style={{ color: '#6161c2' }}>Colour :</strong> Red &
								White
								<br />
								<strong style={{ color: '#6161c2' }}>
									Highlight Description :
								</strong>{' '}
								4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera
							</p>
							<p
								className='text-info p-1'
								style={{ border: '1px solid #b8b8e0', height: '8vh' }}
							>
								<strong style={{ color: '#6161c2' }}>Full Description :</strong>{' '}
								4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera, 24MP
								Front Camera, Dual Flash, 6.67inch Screen, 16:9 Ratio, IPS
								Display, Fingerprint Sensor, 2G/4G/5G, Dual Sim
							</p>
							<Button
								type='ghost'
								className='btn-block'
								icon={<HeartOutlined />}
							>
								Add To Wish List
							</Button>
							<Button
								type='ghost'
								className='btn-block'
								icon={<ShoppingCartOutlined />}
							>
								Add To Cart
							</Button>
							<Button
								type='ghost'
								className='btn-block'
								icon={<ShoppingOutlined />}
							>
								Buy Now
							</Button>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col p-4'>
						<Card style={{ width: '100% ' }}>
							<div>
								<Progress percent={30} size='small' />
								<Progress percent={50} size='small' status='active' />
								<Progress percent={70} size='small' status='exception' />
								<Progress percent={100} size='small' />
							</div>
							<List
								itemLayout='horizontal'
								dataSource={data}
								renderItem={(item) => (
									<List.Item>
										<List.Item.Meta
											avatar={
												<Avatar src='https://joeschmoe.io/api/v1/random' />
											}
											title={
												<Rate
													allowHalf
													defaultValue={item.value}
													disabled={true}
												/>
											}
											description='Ant Design, a design language for background applications, is refined by Ant UED Team'
										/>
									</List.Item>
								)}
							/>
							<div className='float-right'>
								<Button type='default' className='m-2'>
									{'<'}
								</Button>
								<Button type='default'>{'>'}</Button>
							</div>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<ProductCarousel />
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
