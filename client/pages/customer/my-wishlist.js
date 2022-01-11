import HeadText from '../../components/HeadText';
import { List, Avatar, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	delWishlistItem,
	getWishlistItems,
} from '../../redux/actions/wishlist';
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
const MyWishlist = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const wishlistData = useSelector((state) => state.wishlistData);
	const { wishlistItems, loading, success } = wishlistData;

	useEffect(() => {
		dispatch(getWishlistItems());
	}, []);

	return (
		<>
			<HeadText
				headText='Your Wishlist'
				subText='Feel free to buy or checkout these products'
			/>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<List
						itemLayout='horizontal'
						loading={loading}
						dataSource={wishlistData}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src={item.product.images[0].Location} />}
									title={<a href='https://ant.design'>{item.product.name}</a>}
									description={
										<>
											<p>{item.product.highlightDescription}</p>
											<h5>Price : ${item.product.price}</h5>
										</>
									}
								/>

								<button
									className='btn btn-outline-danger p-2'
									onClick={() => dispatch(delWishlistItem(item._id))}
								>
									<DeleteOutlined />
								</button>
							</List.Item>
						)}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 offset-md-3 text-center'>
					{/* <Button type='default' className='m-2'>
						Show more
					</Button> */}
				</div>
			</div>
		</>
	);
};

export default MyWishlist;
