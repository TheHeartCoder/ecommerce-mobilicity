import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CouponFormModal from '../../components/admin/CouponFormModal';
import HeadText from '../../components/HeadText';
import { deleteCoupon, getCoupons } from '../../redux/actions/coupon';
import moment from 'moment';

const CouponList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();

  const dispatch = useDispatch();

  const couponData = useSelector((state) => state.couponData);
  const { loading, coupons, success } = couponData;

  const [currentSlug, setCurrentSlug] = useState(null);

  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    } else {
      dispatch(getCoupons());
    }
  }, []);

  const delCoupon = (slug) => {
    dispatch(deleteCoupon(slug));
  };

  return (
    <>
      <HeadText
        headText='All Coupons'
        subText='Mangae your coupons from here'
      />
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='ml-auto p-4'>
            <Button
              type='primary'
              size='large'
              className='float-right'
              onClick={showModal}
            >
              Add New Coupon
            </Button>
          </div>
        </div>
      </div>

      <div className='col-md-8 offset-md-2'>
        <List
          className='m-4 card p-2'
          itemLayout='horizontal'
          dataSource={coupons}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://www.seekpng.com/png/detail/105-1053918_coupon-download-png-image-transparent-background-coupon-frame.png' />
                }
                title={item.code}
                description={
                  <>
                    <p>
                      {moment(item.startDate).format('DD/MM/YYYY')} &#10132;{' '}
                      {moment(item.endDate).format('DD/MM/YYYY')}
                    </p>
                    <p>{`Use ${item.limit} times only`}</p>
                    <p>
                      {item.couponType === 'percentage'
                        ? `${item.discount} % Off`
                        : `Flat $${item.discount} Off`}
                    </p>
                    <p>{`Minimum Order shoud be $${item.minimumOrderAmount}`}</p>
                  </>
                }
              />
              <button
                className='btn btn-secondary'
                onClick={() => setCurrentSlug(item._id)}
              >
                <EditOutlined />
              </button>

              <button
                className='btn btn-danger m-2'
                onClick={() => {
                  delCoupon(item._id);
                }}
              >
                <DeleteOutlined />
              </button>
            </List.Item>
          )}
        />
      </div>

      <CouponFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        loading={loading}
        success={success}
        currentSlug={currentSlug}
        coupons={coupons}
        setCurrentSlug={setCurrentSlug}
      />
    </>
  );
};

export default CouponList;
