import HeadText from '../../components/HeadText';

import { Button, Card, List, Avatar, Rate, Progress, Image } from 'antd';
import {
	ShoppingCartOutlined,
	HeartOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
// import ProductCarousel from '../../components/Index/ProductCarousel';
import CarouselBorad from '../../components/Index/CarouselBorad';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProduct } from '../../redux/actions/products';
import Loader from '../../components/loader';
import { addCartItem } from '../../redux/actions/cart';
import { addWishlistItem } from '../../redux/actions/wishlist';

const Product = () => {
	const [imgForView, setImgForView] = useState('');

	const router = useRouter();

	const { slug } = router.query;

	const dispatch = useDispatch();

	const productData = useSelector((state) => state.productData);
	const { product, loading } = productData;

	const cartData = useSelector((state) => state.cartData);
	const { loadingCart, success } = cartData;

	useEffect(() => {
		slug && dispatch(getProduct(slug));
	}, [slug]);

	useEffect(() => {
		if (product) setImgForView(product.images[0].Location);
	}, [product]);

	useEffect(() => {
		if (success) router.push('/customer/my-cart');
	}, [success]);

	const addItemToCart = () => {
		dispatch(addCartItem({ productId: product._id, quantity: 1 }));
	};

	const addItemToWishlist = () => {
		dispatch(addWishlistItem({ productId: product._id }));
	};

	return (
		<>
			{' '}
			<HeadText
				headText='Product Details'
				subText={`Specification/Details of Product A is showing here. If you like then feel free to buy.`}
			/>
			{loading ? (
				<Loader />
			) : (
				<div className='container'>
					<div className='row'>
						<div className='col-md-6 p-4'>
							<Card style={{ width: '100% ' }}>
								<Image width={475} src={imgForView} />
								{/* </div> */}
								<div className='d-flex justify-content-center'>
									{product &&
										product.images.length > 1 &&
										product.images.map((img) => (
											<>
												<img
													src={img.Location}
													key={img.key}
													style={{
														height: '80px',
														width: '80px',
														cursor: 'pointer',
													}}
													alt={img.key + '_p_img'}
													onClick={() => setImgForView(img.Location)}
												/>
											</>
										))}
								</div>
								<br />
							</Card>
						</div>
						<br />
						<div className='col-md-6 p-4'>
							<Card style={{ width: '100% ' }}>
								<h2 className=''>
									{product && product.name}
									<Rate
										allowHalf
										defaultValue={4.5}
										disabled={true}
										className='ml-4'
									/>{' '}
									<span style={{ fontSize: '10px' }}>(495 reviews)</span>
								</h2>
								<p
									className='text-info p-1'
									style={{ border: '1px solid #b8b8e0' }}
								>
									<strong style={{ color: '#6161c2' }}>Brand :</strong>{' '}
									{product && product.brand.title}
									<br />
									<strong style={{ color: '#6161c2' }}>Colour :</strong>{' '}
									{product && product.brand.color}
									<br />
									<strong style={{ color: '#6161c2' }}>
										Highlight Description :
									</strong>{' '}
									{product && product.highlightDescription}
								</p>
								<p
									className='text-info p-1'
									style={{ border: '1px solid #b8b8e0', height: '12vh' }}
								>
									<strong style={{ color: '#6161c2' }}>
										Full Description :
									</strong>{' '}
									{product && product.description}
								</p>

								<Button
									type='ghost'
									className='btn-block'
									icon={<HeartOutlined />}
									onClick={addItemToWishlist}
								>
									Add To Wish List
								</Button>
								<Button
									type='ghost'
									className='btn-block'
									icon={<ShoppingCartOutlined />}
									onClick={addItemToCart}
								>
									Add To Cart
								</Button>
								<Button
									type='ghost'
									className='btn-block'
									icon={<ShoppingOutlined />}
									onClick={router.push('/checkout')}
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
									dataSource={[]}
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
							<CarouselBorad />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Product;
