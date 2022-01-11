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
import { useRouter } from 'next/router';

import HeadText from '../components/HeadText';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getCartItems } from '../redux/actions/cart';

const { Step } = Steps;
const checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;

  const cartData = useSelector((state) => state.cartData);
  const { cartItems, loading, success, loadingCart } = cartData;

  const productData = useSelector((state) => state.productData);
  const { product, loading: productLoading } = productData;

  useEffect(() => {
    if (!userInfo && !userInfo.role) {
      router.push('/login');
      return;
    }
  }, [userInfo]);

  useEffect(() => {
    if (router.query.product) {
      dispatch(getProduct(router.query.product));
    } else {
      if (cartItems && cartItems.length < 1) {
        toast.error('Please add some items to cart');
        router.push('/products');
      } else {
        if (!cartItems) {
          dispatch(getCartItems());
        }
      }
    }
  }, [router.query, cartItems]);

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
