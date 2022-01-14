import { LoadingOutlined } from '@ant-design/icons';
import { PayPalButton } from 'react-paypal-button-v2';

const PaymentForm = ({ coupons, order, sdkReady, successPaymentHandler }) => {
  return (
    <div className='row'>
      <div className='col-md-10 offset-md-1'>
        <div className='card p-4 m-2'>
          <div>
            {' '}
            <h5 className='text-info text-center p-2'>Total price : $2563 </h5>
            {sdkReady ? (
              <LoadingOutlined />
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
