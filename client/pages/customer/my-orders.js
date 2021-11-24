import HeadText from '../../components/HeadText';
import { List, Avatar, Button } from 'antd';
import { useState } from 'react';
import Link from 'next/link';
import ReviewModal from '../../components/orders/ReviewModal';
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
];
const MyOrders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <HeadText
        headText='Your orders'
        subText='Check your order details & status'
      />

      <div className='container'>
        <div className='row'>
          <div className='col d-flex p-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Search with order id'
            />
            <button className='btn btn-primary ml-2'>Search</button>
          </div>
        </div>
        <hr />
        <div className='card'>
          <div className='row pr-4'>
            <div className='col'>
              <select
                className='form-control mt-2 float-right'
                style={{ width: '20%' }}
              >
                <option>Filter By Status</option>
                <option>Ordered</option>
                <option>Shipped</option>
                <option>Out For Delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <div className='row p-4'>
            <div className='col'>
              <List
                itemLayout='horizontal'
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000' />
                      }
                      title={
                        <Link href='/orders/1'>
                          <a>{item.title}</a>
                        </Link>
                      }
                      description={
                        <p>
                          Ant Design, a design language for background
                          applications, is refined by Ant UED Team <br />
                          <small className='text-success'>
                            Delivered on 8th Nov, 2021
                          </small>
                        </p>
                      }
                    />
                    <h className='text-info mr-4'>$250</h>
                    <button className='btn btn-link p-2' onClick={showModal}>
                      Give rating & review
                    </button>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className='row p-4'>
            <div className='col-md-6 offset-md-3 text-center'>
              <Button type='default' className='m-2'>
                Show more
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default MyOrders;
