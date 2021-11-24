import HeadText from '../../components/HeadText';

import { List, Avatar, Button, InputNumber } from 'antd';
const data = [
	{
		title: 'Test Product 1',
	},
	{
		title: 'Test Product 2',
	},
	{
		title: 'Test Product 3',
	},
	{
		title: 'Test Product 4',
	},
];
const MyCart = () => {
	return (
		<>
			<HeadText headText='Cart' subText='feel free to buy these products' />
			<div className='container'>
				<div className='row'>
					<div className='col'>
						<List
							itemLayout='horizontal'
							dataSource={data}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											<Avatar src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000' />
										}
										title={<a href='https://ant.design'>{item.title}</a>}
										description='Ant Design, a design language for background applications, is refined by Ant UED Team'
									/>
									<h className='text-info mr-4'>$250</h>
									<InputNumber
										size='medium'
										min={1}
										max={3}
										defaultValue={1}
										onChange={() => {}}
										className='mr-2'
									/>
									<Button type='danger'>Remove</Button>
								</List.Item>
							)}
						/>
					</div>
				</div>
				<hr />
				<div className='row'>
					<div className='col'>
						{' '}
						<h3 className='text-info float-right'>
							Total Price : <strong>$2500</strong>
						</h3>
					</div>{' '}
					<br />
					<Button type='primary'>Place order</Button>
				</div>
			</div>
		</>
	);
};

export default MyCart;
