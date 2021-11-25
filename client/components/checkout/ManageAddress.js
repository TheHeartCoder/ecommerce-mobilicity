import { List } from 'antd';

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
const ManageAddress = () => {
	return (
		<>
			<div className='row p-4 card'>
				<div className='col'>
					<List
						itemLayout='horizontal'
						dataSource={data}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									title={<p className='text-primary'>{item.title}</p>} // which will be selected that one color will be text-primary or else text-dark
									description='AC 166 , Ashoke villa, 2nd floor, Prafulla Kanan (N), Keshtopur, Kolkata, West Bengal - 700101'
								/>
								<input type='radio' value='' name='checkoutAddress' />
							</List.Item>
						)}
					/>
				</div>
			</div>
		</>
	);
};

export default ManageAddress;
