import HeadText from '../../components/HeadText';

import { List, Avatar, Button, InputNumber } from 'antd';
import { useEffect } from 'react';

import {
  addCartItem,
  delCartItem,
  getCartItems,
} from '../../redux/actions/cart';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { useRouter } from 'next/router';

const MyCart = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cartData);
  const { cartItems, loading, success, loadingCart } = cartData;

  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  console.log(cartItems);
  console.log(
    cartItems &&
      cartItems.map(({ product, quantity }) => product.price * quantity)
  );
  const handlePlaceOrder = () => {
    router.push('/checkout');
  };
  return (
    <>
      <HeadText headText='Cart' subText='Feel free to buy these products' />
      {loading ? (
        <Loader />
      ) : cartItems && cartItems.length > 0 ? (
        <div className='container'>
          <div className='card'>
            <div className='row'>
              <div className='col-md-10 offset-md-1'>
                <List
                  itemLayout='horizontal'
                  dataSource={cartItems}
                  className='m-2'
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={item.product.images[0].Location} />
                        }
                        title={
                          <a href='https://ant.design'>{item.product.name}</a>
                        }
                        description={
                          <>
                            <p>{item.product.highlightDescription}</p>
                            <h5>
                              Total Price : $
                              {item.product.price * item.quantity}
                            </h5>
                          </>
                        }
                      />
                      <h3 className='text-info mr-4'>${item.product.price}</h3>
                      <InputNumber
                        min={1}
                        max={3}
                        value={item.quantity}
                        disabled={loadingCart}
                        onChange={(value) => {
                          console.log(value);
                          dispatch(
                            addCartItem({
                              productId: item.product._id,
                              quantity: value,
                            })
                          );
                        }}
                        className='m-2'
                      />
                      <Button
                        type='danger'
                        onClick={() => dispatch(delCartItem(item._id))}
                      >
                        Remove
                      </Button>
                    </List.Item>
                  )}
                />
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col'>
                {' '}
                <div className='float-right d-flex'>
                  <h3 className='text-info'>
                    Total Price :{' '}
                    <strong>
                      $
                      {cartItems && cartItems.length > 0
                        ? cartItems
                            .map(
                              ({ product, quantity }) =>
                                product.price * quantity
                            )
                            .reduce((a, c) => {
                              return a + c;
                            })
                        : '00'}
                    </strong>
                  </h3>
                  <Button
                    type='primary'
                    className='mr-4 ml-4'
                    onClick={handlePlaceOrder}
                  >
                    Place order
                  </Button>
                </div>
              </div>{' '}
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='card'>
            <div className='row'>
              <div className='col'>
                <h3 className='text-center m-4'>{'No items in cart'}</h3>
              </div>
              <button
                className='btn btn-info btn-block m-4 p-2'
                onClick={() => router.push('/')}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCart;
