import HeadText from '../../components/HeadText';
import { Button, Table, Tag, Space, Pagination, Collapse, Image } from 'antd';
import { useState } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';

const { Panel } = Collapse;

const CustomerList = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [visible, setVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	function callback(key) {
		console.log(key);
	}

	const columns = [
		{
			title: 'Joined Date',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Customer Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Email ID',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'All Addresses',
			dataIndex: 'age',
			key: 'age',
			render: (text) => (
				<Space size='middle'>
					<Collapse defaultActiveKey={['1']}>
						<Panel header='This is panel header 1' key='1'>
							<p>{text}</p>
						</Panel>
					</Collapse>
				</Space>
			),
		},
		{
			title: 'All Orders',
			dataIndex: 'address',
			key: 'address',
			render: () => (
				<>
					<Button type='primary' onClick={() => {}}>
						Show Orderes
					</Button>
				</>
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
				headText='All Customers'
				subText='Mangae your customers from here'
			/>

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

export default CustomerList;
