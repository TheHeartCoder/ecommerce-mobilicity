import HeadText from '../../components/HeadText';
import {
	Button,
	Table,
	Tag,
	Space,
	Pagination,
	Collapse,
	Image,
	List,
	Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getProducts } from '../../redux/actions/products';

const ProductList = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [visible, setVisible] = useState(false);
	const [currentSlug, setCurrentSlug] = useState(null);
	const [curPage, setCurPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const loggedInUser = useSelector((state) => state.loggedInUser);
	const { userInfo } = loggedInUser;
	const router = useRouter();

	const dispatch = useDispatch();

	const productData = useSelector((state) => state.productData);
	const { loading, products, success, count, page } = productData;
	console.log(products);
	useEffect(() => {
		if (userInfo.role !== 'Admin') {
			router.push('/');
		} else {
			dispatch(getProducts(curPage, limit));
		}
	}, [curPage, limit]);

	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'name',
			key: 'name',
		},
		// {
		// 	title: 'Color',
		// 	dataIndex: 'color',
		// 	key: 'category.title',
		// },
		// {
		// 	title: 'Featured',
		// 	dataIndex: 'featured',
		// 	key: 'featured',
		// },
		// {
		// 	title: 'Images',
		// 	dataIndex: 'address',
		// 	key: 'address',
		// 	render: () => (
		// 		<>
		// 			<Button type='primary' onClick={() => setVisible(true)}>
		// 				Show Images
		// 			</Button>
		// 			<div style={{ display: 'none' }}>
		// 				<Image.PreviewGroup
		// 					preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
		// 				>
		// 					<Image src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000' />
		// 					<Image src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-xs-silver?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1579299535944' />
		// 					<Image src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-purple-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1617130317000' />
		// 				</Image.PreviewGroup>
		// 			</div>
		// 		</>
		// 	),
		// },
		// {
		// 	title: 'Featured',
		// 	key: 'tags',
		// 	dataIndex: 'tags',
		// 	render: (tags) => (
		// 		<>
		// 			{tags.map((tag) => {
		// 				let color = tag.length > 5 ? 'geekblue' : 'green';
		// 				if (tag === 'loser') {
		// 					color = 'volcano';
		// 				}
		// 				return (
		// 					<Tag color={color} key={tag}>
		// 						{tag.toUpperCase()}
		// 					</Tag>
		// 				);
		// 			})}
		// 		</>
		// 	),
		// },
		// {
		// 	title: 'Action',
		// 	key: 'action',
		// 	render: (text, record) => (
		// 		<Space size='middle'>
		// 			<Button type='ghost'>
		// 				{' '}
		// 				<EditOutlined />
		// 			</Button>
		// 			<Button type='primary' danger>
		// 				<DeleteOutlined />
		// 			</Button>
		// 		</Space>
		// 	),
		// },
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
				<List
					className='m-4 card p-2'
					itemLayout='horizontal'
					dataSource={products ? products : []}
					loading={loading}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Avatar
										src={item.images[0].Location}
										shape='square'
										width={80}
									/>
								}
								title={item.name}
								description={
									<>
										{item.highlightDescription}
										<br />
										<div className='row'>
											<div className='col-md-4'>
												Category:
												<span className='text-info'>{item.category.title}</span>
											</div>
											<div className='col-md-4'>
												Brand:
												<span className='text-info'>{item.brand.title}</span>
											</div>
											<div className='col-md-4'>
												Color: <span className='text-info'>{item.color}</span>
											</div>
											<div className='col-md-4'>
												Quantity :
												<span className='text-info'> {item.quantity}</span>
											</div>
											<div className='col-md-4'>
												Price: <span className='text-info'>${item.price}</span>
											</div>
											<div className='col-md-4'>
												<a
													className='text-link'
													onClick={(e) => {
														e.preventDefault();
														setVisible(true);
													}}
												>
													Click Here To See Images
												</a>
											</div>
										</div>
									</>
								}
							/>
							<div style={{ display: 'none' }}>
								<Image.PreviewGroup
									preview={{
										visible,
										onVisibleChange: (vis) => setVisible(vis),
									}}
								>
									{item.images.map((image) => (
										<Image src={image.Location} />
									))}
								</Image.PreviewGroup>
							</div>
							<Tag color={'blue'}>
								{item.featured ? 'Featured' : 'Not Featured'}
							</Tag>
							<button
								className='btn btn-secondary'
								onClick={() => {
									setCurrentSlug(item.slug);
								}}
							>
								<EditOutlined />
							</button>
							<button
								className='btn btn-danger m-2'
								onClick={() => delCategory(item.slug)}
							>
								<DeleteOutlined />
							</button>
						</List.Item>
					)}
				/>
			</div>
			<div className='row'>
				<div className='m-auto p-4'>
					<Pagination
						size='small'
						total={count}
						showSizeChanger
						showQuickJumper
						current={curPage}
						pageSize={10}
						onChange={(page, pageSize) => {
							setCurPage(page);
							setLimit(pageSize);
						}}
					/>
				</div>
			</div>

			<ProductFormModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				currentSlug={currentSlug}
				setCurrentSlug={setCurrentSlug}
			/>
		</>
	);
};

export default ProductList;
