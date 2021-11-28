import { Modal } from 'antd';
const BrandFormModal = ({ isModalVisible, setIsModalVisible }) => {
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal
			title='Add Your Brands'
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText='Save'
		>
			<input className='form-control mb-4 p-2' placeholder='Brand name' />
			<textarea
				className='form-control p-2'
				placeholder='Small Description'
			></textarea>
		</Modal>
	);
};

export default BrandFormModal;
