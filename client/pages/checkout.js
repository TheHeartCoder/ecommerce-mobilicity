import { Steps } from 'antd';
import {
	UserOutlined,
	SolutionOutlined,
	LoadingOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import ManageAddress from '../components/checkout/ManageAddress';
import PaymentForm from '../components/checkout/PaymentForm';
import PaymentSuccess from '../components/checkout/PaymentSuccess';
import PaymentFailed from '../components/checkout/PaymentFailed';

import HeadText from '../components/HeadText';

const { Step } = Steps;
const checkout = () => {
	return (
		<>
			<HeadText
				headText='Checkout'
				subText='Please provide correct info and complete your payment to book your order'
			/>
			<div className='container'>
				<Steps className='p-4'>
					<Step status='finish' title='Login' icon={<UserOutlined />} />
					<Step
						status='finish'
						title='Delivery Address'
						icon={<SolutionOutlined />}
					/>
					<Step status='process' title='Payment' icon={<LoadingOutlined />} />
					<Step status='wait' title='Done' icon={<SmileOutlined />} />
				</Steps>
				<hr />
				{/* <ManageAddress /> */}
				<PaymentForm />
				{/* <PaymentSuccess /> --- Success Step*/}
				{/* <PaymentFailed /> --- Failed Step */}
			</div>
		</>
	);
};

export default checkout;
