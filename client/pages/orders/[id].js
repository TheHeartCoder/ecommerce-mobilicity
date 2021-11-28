import { useState } from 'react';
import HeadText from '../../components/HeadText';
import ReviewModal from '../../components/orders/ReviewModal';
import Link from 'next/link';
import { Steps, Avatar, List, Collapse, Select, Button } from 'antd';
const { Step } = Steps;
const { Panel } = Collapse;
const { Option } = Select;

const SingleOrder = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

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

	const showModal = () => {
		setIsModalVisible(true);
	};
	return (
		<>
			<HeadText
				headText='Order Details'
				subText={`Order details of Product A is showing here.`}
			/>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12 '>
						<div className='card m-2 p-4'>
							<Collapse className='mb-4' defaultActiveKey={['1']}>
								<Panel header='Customer Details' key='1'>
									<div>
										{' '}
										<h5>Arindam Paul</h5>
										<p>parindam1@gmail.com</p>
									</div>
								</Panel>
							</Collapse>
							<Collapse className='mb-4' defaultActiveKey={['1']}>
								<Panel header='Delivery Address' key='1'>
									<div>
										Arindam Pal <br /> AC 166 , Ashoke villa, 2nd floor,
										Prafulla Kanan (N) Keshtopur, Near Nona Pukur / Balak Sangha{' '}
										<br />
										Kolkata - 700101 <br />
										West Bengal <br />
										Phone number 7001722370, 9932046896
									</div>
								</Panel>
							</Collapse>
							<Collapse defaultActiveKey={['1']}>
								<Panel header='Order Summary' key='1'>
									<List
										itemLayout='horizontal'
										dataSource={data}
										renderItem={(item) => (
											<List.Item>
												<List.Item.Meta
													avatar={
														<Avatar src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000' />
													}
													title={<a href='https://ant.design'>{item.title}</a>}
													description='Ant Design, a design language for background applications, is refined by Ant UED Team'
												/>
												<h className='text-info mr-4'>$250</h>
												{/* <InputNumber
											min={1}
											max={3}
											defaultValue={1}
											onChange={() => {}}
											className='m-2'
										/> */}
												{/* <Button type='danger'>Remove</Button> */}
											</List.Item>
										)}
									/>
									<div className='row'>
										<div className='col'>
											{' '}
											<div className='float-right d-flex'>
												<h3 className='text-info'>
													Total Price : <strong>$2500</strong>
												</h3>
												{/* <Button type='primary' className='mr-4 ml-4'>
											Place order
										</Button> */}
											</div>
										</div>{' '}
									</div>
								</Panel>
							</Collapse>

							<hr className='mb-4' />
							<Steps
								progressDot
								current={0}
								size='small'
								responsive={true}
								calssName='m-4'
								// status='error'
							>
								<Step title='Ordered' description='On 15th Nov, 2021' />
								<Step title='Shipped' description='On 18th Nov, 2021' />
								<Step
									title='Out For Delivery'
									description='On 21th Nov, 2021'
								/>
								<Step title='Delivered' description='On 24th Nov, 2021' />
								<Step title='Cancelled' description='On 17th Nov, 2021' />
							</Steps>
							<div>
								<Button className='float-right m-2' type='primary'>
									View Invoice
								</Button>
								<Button
									className='float-right m-2'
									type='primary'
									onClick={showModal}
								>
									Give rating & review
								</Button>

								<Select
									defaultValue='Pending'
									style={{ width: 120 }}
									className='float-right m-2'
								>
									<Option value='Pending'>Pending</Option>
									<Option value='Pending'>Pending</Option>
									<Option value='Pending'>Pending</Option>
									<Option value='Pending'>Pending</Option>
								</Select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ReviewModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</>
	);
};

export default SingleOrder;
