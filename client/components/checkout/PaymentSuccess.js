import { CheckCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
const PaymentSuccess = () => {
	return (
		<div className='col-md-4 offset-md-4 card'>
			<h4 className='text-center p-2'>Thank You For Your Order</h4>
			<CheckCircleOutlined className='text-center p-4' />
			<p className='text-center'>
				Your Order ID is{' '}
				<Link href='/orders/1'>
					<a>123654</a>
				</Link>
			</p>
		</div>
	);
};

export default PaymentSuccess;
