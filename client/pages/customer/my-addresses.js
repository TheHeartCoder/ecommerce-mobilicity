import { List, Button } from 'antd';
import {
	PlusSquareOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import HeadText from '../../components/HeadText';
const data = [
	{
		title: 'Mr. Arindam Paul 1 || 7001722370',
	},
	{
		title: 'Mr. Arindam Paul 2 || 7001722370',
	},
	{
		title: 'Mr. Arindam Paul 3 || 7001722370',
	},
	{
		title: 'Mr. Arindam Paul 4 || 7001722370',
	},
	{
		title: 'Mr. Arindam Paul 4 || 7001722370',
	},
];

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
	addAddress,
	deleteAddress,
	getUserAddress,
	updateAddress,
} from '../../redux/actions/address';
import toast from 'react-hot-toast';

const initialState = {
	fullName: '',
	phoneNo: '',
	pinNo: '',
	locality: '',
	landmark: '',
	phoneNo2: '',
	fullAddress: '',
	state: '',
};

const MyAddresses = () => {
	const [addressInfo, setAddressInfo] = useState(initialState);
	const [currentId, setCurrentId] = useState('');
	const [formOpen, setFormOpen] = useState(false);
	const dispatch = useDispatch();

	const addressData = useSelector((state) => state.addressData);
	const { adds, loading, success } = addressData;

	useEffect(() => {
		dispatch(getUserAddress());
	}, []);

	useEffect(() => {
		if (success) {
			setAddressInfo(initialState);
			setFormOpen(false);
			setCurrentId('');
		}
	}, [success]);

	const handleSave = () => {
		Object.keys(addressInfo).forEach(function (key) {
			if (addressInfo[key] === '') {
				toast.error('Please fill all the fields');
				return;
			}
		});
		if (currentId) {
			dispatch(updateAddress(currentId, addressInfo));
		} else {
			dispatch(addAddress(addressInfo));
		}
	};

	return (
		<>
			<HeadText
				headText='Your Address'
				subText='Manage your addresses from here'
			/>
			<div className='container'>
				<div className='card'>
					<div className='row p-4'>
						<div className='col'>
							<Button
								type='primary'
								className='float-right'
								icon={<PlusSquareOutlined />}
								onClick={() => {
									setFormOpen(true);
									setCurrentId('');
								}}
							>
								Add New Address
							</Button>
						</div>
					</div>
					{formOpen && (
						<div className='row p-4'>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Your full name'
									value={addressInfo.fullName}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, fullName: e.target.value })
									}
								/>
							</div>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Your phone no'
									value={addressInfo.phoneNo}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, phoneNo: e.target.value })
									}
								/>
							</div>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Your pin no'
									value={addressInfo.pinNo}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, pinNo: e.target.value })
									}
								/>
							</div>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Your locality'
									value={addressInfo.locality}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, locality: e.target.value })
									}
								/>
							</div>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Your landmark'
									value={addressInfo.landmark}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, landmark: e.target.value })
									}
								/>
							</div>
							<div className='col-md-4 p-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Alternative phone number(Optional)'
									value={addressInfo.phoneNo2}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, phoneNo2: e.target.value })
									}
								/>
							</div>
							<div className='col-md-8 p-2'>
								<textarea
									className='form-control'
									placeholder='Full address'
									value={addressInfo.fullAddress}
									onChange={(e) =>
										setAddressInfo({
											...addressInfo,
											fullAddress: e.target.value,
										})
									}
								></textarea>
							</div>
							<div className='col-md-4 p-2'>
								<select
									className='form-control'
									value={addressInfo.state}
									onChange={(e) =>
										setAddressInfo({ ...addressInfo, state: e.target.value })
									}
								>
									<option>Select Your State</option>
									<option>West Bengal</option>
									<option>Bihar</option>
									<option>Maharastra</option>
								</select>
							</div>
							<div className='col-md-12 p-2'>
								<button
									className='btn btn-primary float-right m-2'
									onClick={handleSave}
								>
									Save
								</button>
								<button
									className='btn btn-secondary float-right m-2'
									onClick={() => {
										setAddressInfo(initialState);
										setFormOpen(false);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					)}

					<hr />
					<div className='row p-4'>
						<div className='col'>
							<List
								itemLayout='horizontal'
								dataSource={adds}
								renderItem={(item) => (
									<List.Item>
										<List.Item.Meta
											title={`${item.fullName} (${item.phoneNo})`}
											description={
												<>
													<p>
														{item.locality} , {item.landmark}, {item.pinNo}
													</p>
													<p>
														{item.fullAddress}, {item.state}
													</p>
													<p>{item.phoneNo2}</p>
												</>
											}
										/>

										<button
											className='btn btn-outline-dark p-2 m-2'
											onClick={() => {
												setCurrentId(item._id);
												setFormOpen(true);
												setAddressInfo({ ...initialState, ...item });
											}}
										>
											<EditOutlined />
										</button>
										<button
											className='btn btn-outline-danger p-2'
											onClick={() => {
												dispatch(deleteAddress(item._id));
											}}
										>
											<DeleteOutlined />
										</button>
									</List.Item>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyAddresses;
