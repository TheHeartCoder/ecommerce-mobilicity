import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Pagination } from 'antd';
import { useState } from 'react';

import CouponModal from '../../components/admin/CouponModal';
import HeadText from '../../components/HeadText';

const data = [
  {
    title: 'Test Product 1',
  },
  {
    title: 'Test Product 2',
  },
  {
    title: 'Test Product 3',
  },
  {
    title: 'Test Product 4',
  },
  {
    title: 'Test Product 1',
  },
  {
    title: 'Test Product 2',
  },
  {
    title: 'Test Product 3',
  },
  {
    title: 'Test Product 4',
  },
];

const BannerList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000' />
                }
                title={item.title}
                description={
                  'Ant Design, a design language for background applications, is refined by Ant UED Team'
                }
              />
              <button className='btn btn-secondary' onClick={() => {}}>
                <EditOutlined />
              </button>

              <button className='btn btn-danger m-2' onClick={() => {}}>
                <DeleteOutlined />
              </button>
            </List.Item>
          )}
        />
      </div>
      <div className='row'>
        <div className='m-auto p-4'>
          <Pagination size='small' total={50} showSizeChanger showQuickJumper />
        </div>
      </div>
      <CouponModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default BannerList;
