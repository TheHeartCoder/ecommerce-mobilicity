import { Modal, DatePicker, Select } from 'antd';
const { Option } = Select;
const CouponModal = ({ isModalVisible, setIsModalVisible }) => {
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal
			title='Add Your Coupons'
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText='Save'
		>
			<input
				type='text'
				className='form-control mb-2 p-2'
				placeholder='Coupon code'
			/>
			<DatePicker
				onChange={() => {}}
				placeholder='Start Date'
				style={{ width: '100%' }}
				className='mb-2'
			/>
			<DatePicker
				onChange={() => {}}
				placeholder='End Date'
				style={{ width: '100%' }}
				className='mb-2'
			/>
			<input className='form-control mb-2 p-2' placeholder='Coupons limit' />
			<Select defaultValue='w' style={{ width: '100%' }} className='mb-2'>
				<Option value='w'>Select Coupon Type</Option>
				<Option value=''>Fixed Amount</Option>
				<Option value=''>Percentage</Option>
			</Select>
			<input
				type='number'
				className='form-control mb-2 p-2'
				placeholder='Discount Value'
			/>
			<input
				type='number'
				className='form-control mb-2 p-2'
				placeholder='Minimum order amount'
			/>
		</Modal>
	);
};

export default CouponModal;
