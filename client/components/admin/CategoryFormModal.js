import { Modal, Rate } from 'antd';
const CategoryFormModal = ({ isModalVisible, setIsModalVisible }) => {
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal
			title='Add Your Product Category'
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText='Save'
		>
			<input className='form-control mb-4 p-2' placeholder='Category title' />
			<textarea
				className='form-control p-2'
				placeholder='Small Description'
			></textarea>
		</Modal>
	);
};

export default CategoryFormModal;
