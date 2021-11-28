import HeadText from '../../components/HeadText';
import { Button, Table, Tag, Space, Pagination, Collapse, Image } from 'antd';
import { useState } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ProductList = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	function callback(key) {
		console.log(key);
	}
	console.log(visible);
	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Category',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Brand',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Descriptions',
			dataIndex: 'address',
			key: 'address',
			render: (text) => (
				<Collapse defaultActiveKey={['1']}>
					<Panel header='This is panel header 1' key='1'>
						<p>{text}</p>
					</Panel>
				</Collapse>
			),
		},
		{
			title: 'Images',
			dataIndex: 'address',
			key: 'address',
			render: () => (
				<>
					<Button type='primary' onClick={() => setVisible(true)}>
						Show Images
					</Button>
					<div style={{ display: 'none' }}>
						<Image.PreviewGroup
							preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
						>
							<Image src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000' />
							<Image src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-xs-silver?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1579299535944' />
							<Image src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000' />
						</Image.PreviewGroup>
					</div>
				</>
			),
		},
		{
			title: 'Featured',
			key: 'tags',
			dataIndex: 'tags',
			render: (tags) => (
				<>
					{tags.map((tag) => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<Space size='middle'>
					<Button type='ghost'>
						{' '}
						<EditOutlined />
					</Button>
					<Button type='primary' danger>
						<DeleteOutlined />
					</Button>
				</Space>
			),
		},
	];

	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
			tags: ['cool'],
		},
	];

	return (
		<>
			<HeadText
				headText='All Products'
				subText='Mangae your products from here'
			/>
			<div className='row'>
				<div className='col-md-10 offset-md-1'>
					<div className='ml-auto p-4'>
						<Button
							type='primary'
							size='large'
							className='float-right'
							onClick={showModal}
						>
							Add New Product
						</Button>
					</div>
				</div>
			</div>
			<div className='col-md-10 offset-md-1'>
				<Table
					columns={columns}
					dataSource={data}
					className='m-4'
					pagination={false}
				/>
			</div>
			<div className='row'>
				<div className='m-auto p-4'>
					<Pagination size='small' total={50} showSizeChanger showQuickJumper />
				</div>
			</div>
			<ProductFormModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</>
	);
};

export default ProductList;
