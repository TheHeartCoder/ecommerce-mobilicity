import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import CouponModal from '../../components/admin/CouponModal';
import HeadText from '../../components/HeadText';
import { deleteBanner, getBanners } from '../../redux/actions/banner';
import BannerFormModal from '../../components/admin/BannerFormModal';
import ImageViewer from '../../components/products/ImageViewer';

const BannerList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();

  const dispatch = useDispatch();

  const bannerData = useSelector((state) => state.bannerData);
  const { loading, banners, success } = bannerData;

  const [currentSlug, setCurrentSlug] = useState(null);
  const [bImage, setBImage] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    } else {
      dispatch(getBanners());
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const delBanner = (slug) => {
    dispatch(deleteBanner(slug));
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
          className='m-4 card'
          itemLayout='horizontal'
          dataSource={banners}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.image?.Location}
                    shape='square'
                    onClick={() => {
                      setBImage([item.image]);
                      setVisible(true);
                    }}
                  />
                }
                title={item.title}
              />
              <button
                className='btn btn-secondary'
                onClick={() => setCurrentSlug(item.slug)}
              >
                <EditOutlined />
              </button>

              <button
                className='btn btn-danger m-2'
                onClick={() => {
                  delBanner(item.slug);
                }}
              >
                <DeleteOutlined />
              </button>
            </List.Item>
          )}
        />
      </div>

      <BannerFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        loading={loading}
        success={success}
        currentSlug={currentSlug}
        banners={banners}
        setCurrentSlug={setCurrentSlug}
      />
      <ImageViewer images={bImage} visible={visible} setVisible={setVisible} />
    </>
  );
};

export default BannerList;
