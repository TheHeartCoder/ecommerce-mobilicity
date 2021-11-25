import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
const PaymentFailed = () => {
  return (
    <div className='col-md-4 offset-md-4 card'>
      <h4 className='text-danger text-center'>Payment Failed</h4>
      <CloseCircleOutlined className='text-center p-2' />
      <p className='text-center text-info'>
        <Button type='primary' size='large'>
          Try Again
        </Button>
      </p>
    </div>
  );
};

export default PaymentFailed;
