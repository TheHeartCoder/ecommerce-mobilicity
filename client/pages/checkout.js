import { Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  SmileOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import ManageAddress from '../components/checkout/ManageAddress';
import PaymentForm from '../components/checkout/PaymentForm';
import PaymentSuccess from '../components/checkout/PaymentSuccess';
import PaymentFailed from '../components/checkout/PaymentFailed';
import { useRouter } from 'next/router';
import { getProduct } from '../redux/actions/products';

import HeadText from '../components/HeadText';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getCartItems } from '../redux/actions/cart';
import { getUserAddress } from '../redux/actions/address';
import { getCoupons } from '../redux/actions/coupon';
import { createOrder } from '../services/orderService';
import Script from 'next/script';
import axios from 'axios';

const { Step } = Steps;
const checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [stepNo, setStepNo] = useState({ running: '', end: 0 });
  const [sdkReady, setSdkReady] = useState(false);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;

  const cartData = useSelector((state) => state.cartData);
  const { cartItems, loading, success, loadingCart } = cartData;

  const productData = useSelector((state) => state.productData);
  const { product, loading: productLoading } = productData;

  const addressData = useSelector((state) => state.addressData);
  const { adds, loading: loadingAdd, success: successAdd } = addressData;

  const couponData = useSelector((state) => state.couponData);
  const {
    loading: loadingCoupon,
    success: successCoupon,
    coupons,
  } = couponData;

  const [order, setOrder] = useState({
    order: '',
    coupon: '',
    paymentResult: {},
  });

  useEffect(() => {
    if (!userInfo && !userInfo.role) {
      setStepNo({ ...stepNo, running: 0 });
      router.push(`/login?from='checkout'`);
      return;
    } else {
      setStepNo({ ...stepNo, running: 1, end: 0 });
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
          dispatch(getUserAddress());
          dispatch(getCoupons());
        }
      }
    }
  }, [router.query, cartItems, dispatch]);
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: '',
    orderItems: [],
    totalPrice: 0,
    coupon: '',
  });
  useEffect(() => {
    if (product && product?._id && product?._id === route.query.product) {
      setOrderDetails({
        ...orderDetails,
        orderItems: [
          {
            product: product._id,
            price: product.price,
            name: product.name,
            quantity: 1,
            image: product.images[0]?.Location,
          },
        ],
        totalPrice: product.price,
      });
    }
    if (cartItems && cartItems.length > 0) {
      let orderItems = cartItems.map((item) => ({
        product: item.product._id,
        price: item.product.price,
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.images[0]?.Location,
      }));
      setOrderDetails({
        ...orderDetails,
        orderItems: orderItems,
        totalPrice: orderItems
          .map(({ price, quantity }) => price * quantity)
          .reduce((a, c) => {
            return a + c;
          }),
      });
    }
  }, [cartItems, product]);

  useEffect(() => {
    if (
      stepNo.running === 2 &&
      order?.order &&
      !order.order.isPaid &&
      !window.paypal
    ) {
      addPayPalScript();
    }
  }, [stepNo, order]);

  const [paypalSrc, setPaypalSrc] = useState('');
  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    console.log(clientId);

    setPaypalSrc(`https://www.paypal.com/sdk/js?client-id=${clientId}`);
    setSdkReady(true);

    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = ;
    // script.async = true;
    // script.onload = () => {
    //   setSdkReady(true);
    // };
    // document.body.appendChild(script);
  };

  const placeOrder = async (addressID) => {
    const newOrder = await createOrder({
      ...orderDetails,
      shippingAddress: addressID,
    });

    if (newOrder && newOrder._id) {
      setOrder({ ...order, order: newOrder });
      setStepNo({ ...stepNo, running: 2, end: 1 });
    }
  };

  const [paymentStatus, setPaymentStatus] = useState('failed');

  const successPaymentHandler = async (paymentResult) => {
    let orderRes = '';

    order.order._id &&
      (orderRes = await payOrder(order.order._id, paymentResult));

    if (orderRes._id && orderRes.isPaid) {
      setPaymentStatus('paid');
    } else {
      setPaymentStatus('failed');
    }
  };

  return (
    <>
      {!sdkReady && <Script src={paypalSrc} />}
      <HeadText
        headText='Checkout'
        subText='Please provide correct info and complete your payment to book your order'
      />
      <div className='container'>
        <Steps className='p-4'>
          <Step
            status={
              stepNo.end === 0
                ? 'finish'
                : stepNo.running === 0
                ? 'process'
                : 'wait'
            }
            title='Login'
            icon={<UserOutlined />}
          />
          <Step
            status={
              stepNo.end === 1
                ? 'finish'
                : stepNo.running === 1
                ? 'process'
                : 'wait'
            }
            title='Delivery Address'
            icon={<SolutionOutlined />}
          />
          <Step
            status={
              stepNo.end === 2
                ? 'finish'
                : stepNo.running === 2
                ? 'process'
                : 'wait'
            }
            title='Payment'
            // icon={<LoadingOutlined />}
            icon={<CreditCardOutlined />}
          />
          <Step
            status={
              stepNo.end === 3
                ? 'finish'
                : stepNo.running === 3
                ? 'process'
                : 'wait'
            }
            title='Done'
            icon={<SmileOutlined />}
          />
        </Steps>
        <hr />
        {stepNo.running === 1 && (
          <ManageAddress
            addresses={addressData}
            setOrderDetails={setOrderDetails}
            orderDetails={orderDetails}
            setStepNo={setStepNo}
            stepNo={stepNo}
            placeOrder={placeOrder}
          />
        )}
        {stepNo.running === 2 && (
          <PaymentForm
            order={order}
            setOrder={setOrder}
            successPaymentHandler={successPaymentHandler}
            sdkReady={sdkReady}
          />
        )}
        {stepNo.running === 3 && paymentStatus === 'paid' && <PaymentSuccess />}
        {stepNo.running === 3 && paymentStatus === 'failed' && (
          <PaymentFailed />
        )}
      </div>
    </>
  );
};

export default checkout;
