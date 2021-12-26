import { useEffect, useState } from 'react';
import { Menu, Modal, Button } from 'antd';
import {
  LoginOutlined,
  MobileOutlined,
  RightSquareOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../services/authService';
import { USER_LOGOUT } from '../redux/constants/auth';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const { Item, SubMenu } = Menu;

const NavBar = () => {
  const [loggedInuser, setLoggedInUser] = useState({});

  const [current, setCurrent] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    setLoggedInUser(userInfo);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch({ type: USER_LOGOUT });
      await logoutUser();

      toast('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {/* <p>{userInfo && 'I am her'}</p> */}
      <Menu
        mode='horizontal'
        theme='dark'
        selectedKeys={[current]}
        className='mb-1 hide-print'
      >
        <Item key='/home' onClick={(e) => setCurrent(e.key)}>
          <Link href='/'>
            <a style={{ fontWeight: 'bold', fontSize: '30px' }}>Mobilicity</a>
          </Link>
        </Item>
        <Item
          style={{ marginLeft: 'auto' }}
          key='/search'
          onClick={showModal}
          icon={<SearchOutlined />}
        >
          Search
        </Item>
        <Item
          key='/products'
          icon={<MobileOutlined />}
          onClick={(e) => setCurrent(e.key)}
        >
          <Link href='/products'>
            <a>Products</a>
          </Link>
        </Item>
        {!loggedInuser && (
          <>
            <Item
              key='/login'
              icon={<LoginOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href='/login'>
                <a>Log In</a>
              </Link>
            </Item>
            <Item
              key='/register'
              icon={<RightSquareOutlined />}
              onClick={(e) => setCurrent(e.key)}
            >
              <Link href='/register'>
                <a>Register</a>
              </Link>
            </Item>{' '}
          </>
        )}
        {loggedInuser && (
          <SubMenu
            key='SubMenu'
            icon={<UserOutlined />}
            title={loggedInuser.name}
          >
            {loggedInuser.role === 'Admin' ? (
              <>
                {' '}
                <Item key='setting:13'>
                  {' '}
                  <Link href='/admin/category-list'>
                    <a>Categories</a>
                  </Link>
                </Item>
                <Item key='setting:23'>
                  {' '}
                  <Link href='/admin/prduct-brands'>
                    <a>Brands</a>
                  </Link>
                </Item>
                <Item key='setting:33'>
                  {' '}
                  <Link href='/admin/product-list'>
                    <a>Products</a>
                  </Link>
                </Item>
                <Item key='setting:43'>
                  {' '}
                  <Link href='/admin/order-list'>
                    <a>Orders</a>
                  </Link>
                </Item>
                <Item key='setting:55'>
                  {' '}
                  <Link href='/admin/customer-list'>
                    <a>Customers</a>
                  </Link>
                </Item>
                <Item key='sdadsa:00'>
                  {' '}
                  <Link href='/admin/coupon-list'>
                    <a>Coupons</a>
                  </Link>
                </Item>
                <Item key='setting:93'>
                  {' '}
                  <Link href='/admin/banner-list'>
                    <a>Banners</a>
                  </Link>
                </Item>
              </>
            ) : (
              loggedInuser.role === 'Customer' && (
                <>
                  {' '}
                  <Item key='setting:1'>
                    <Link href='/customer/my-profile'>
                      <a>My Profile</a>
                    </Link>
                  </Item>
                  <Item key='setting:5'>
                    <Link href='/customer/my-addresses'>
                      <a>My Addresses</a>
                    </Link>
                  </Item>
                  <Item key='setting:2'>
                    {' '}
                    <Link href='/customer/my-cart'>
                      <a>My Cart</a>
                    </Link>
                  </Item>
                  <Item key='setting:3'>
                    {' '}
                    <Link href='/customer/my-wishlist'>
                      <a>My Wishlist</a>
                    </Link>
                  </Item>
                  <Item key='setting:4'>
                    {' '}
                    <Link href='/customer/my-orders'>
                      <a>My Orders</a>
                    </Link>
                  </Item>
                </>
              )
            )}
            <Item key='sdad99' onClick={logout}>
              Log Out
            </Item>
          </SubMenu>
        )}
      </Menu>

      <Modal
        title='Search Products'
        visible={isModalVisible}
        okText='Search'
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type='text'
          placeholder='Search Products'
          className='form-control'
        />
      </Modal>
    </>
  );
};

export default NavBar;
