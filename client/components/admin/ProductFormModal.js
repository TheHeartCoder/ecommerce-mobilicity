import { Modal, Select, Switch } from 'antd';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

const { Option } = Select;

const ProductFormModal = ({ isModalVisible, setIsModalVisible }) => {
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// handle Images from antd
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);

	const onChange = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	return (
		<Modal
			title='Add Your Brands'
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			okText='Save'
		>
			<input className='form-control mb-2 p-2' placeholder='Product name' />
			<input className='form-control mb-2 p-2' placeholder='Product color' />
			<Select defaultValue='' style={{ width: '100%' }} className='mb-2'>
				<Option value=''>Select Category</Option>
				<Option value='Jack'>Jack</Option>
				<Option value='Lucy'>Lucy</Option>
				<Option value='yiminghe'>yiminghe</Option>
			</Select>
			<Select defaultValue='' style={{ width: '100%' }} className='mb-2'>
				<Option value=''>Select Brand</Option>
				<Option value='Jack'>Jack</Option>
				<Option value='Lucy'>Lucy</Option>
				<Option value='yiminghe'>yiminghe</Option>
			</Select>
			<textarea
				className='form-control p-2 mb-2'
				placeholder='Product Highlight Description'
				maxLength='100'
			></textarea>
			<textarea
				className='form-control p-2 mb-2'
				placeholder='Product Description'
				rows='5'
				maxLength='450'
			></textarea>
			<Switch
				defaultChecked
				onChange={() => {}}
				className='mb-2'
				checkedChildren='Featured'
				unCheckedChildren='Featured?'
			/>
			<input
				type='number'
				className='form-control mb-2 p-2'
				placeholder='Quantity'
			/>
			<ImgCrop rotate>
				<Upload
					action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
					listType='picture-card'
					fileList={fileList}
					onChange={onChange}
					onPreview={onPreview}
				>
					{fileList.length < 5 && '+ Upload'}
				</Upload>
			</ImgCrop>
			<span className='text-warning'>* Maximum 3 images can be uploaded</span>
		</Modal>
	);
};

export default ProductFormModal;
