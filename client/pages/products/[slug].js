import HeadText from '../../components/HeadText';

import 'react-multi-carousel/lib/styles.css';
import ProductImages from '../../components/product/ProductImages';
import { Button, Card, List, Avatar, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import ProductCarousel from '../../components/Index/ProductCarousel';
const data = [
  {
    value: 5,
  },
  {
    value: 3,
  },
  {
    value: 2.5,
  },
  {
    value: 3.5,
  },
  {
    value: 4.5,
  },
];
const Product = () => {
  return (
    <>
      {' '}
      <HeadText
        headText='Product Details'
        subText={`Specification/Details of Product A is showing here. If you like then feel free to buy.`}
      />
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 p-4'>
            <ProductImages />
          </div>
          <br />
          <div className='col-md-6 p-4'>
            <Card style={{ width: '100% ' }}>
              <h2 className=''>Test Product 001</h2>
              <p
                className='text-info p-1'
                style={{ border: '1px solid #b8b8e0' }}
              >
                <strong style={{ color: '#6161c2' }}>Brand :</strong> Apple
                <br />
                <strong style={{ color: '#6161c2' }}>
                  Highlight Description :
                </strong>{' '}
                4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera
              </p>
              <p
                className='text-info p-1'
                style={{ border: '1px solid #b8b8e0' }}
              >
                <strong style={{ color: '#6161c2' }}>Full Description :</strong>{' '}
                4 GB RAM, 256GN Storage, 865G Snapgragon, 66MP Rear Camera, 24MP
                Front Camera, Dual Flash, 6.67inch Screen, 16:9 Ratio, IPS
                Display, Fingerprint Sensor, 2G/4G/5G, Dual Sim
              </p>
              <Button
                type='ghost'
                className='btn-block'
                icon={<HeartOutlined />}
              >
                Add To Wish List
              </Button>
              <Button
                type='ghost'
                className='btn-block'
                icon={<ShoppingCartOutlined />}
              >
                Add To Cart
              </Button>
            </Card>
          </div>
        </div>
        <div className='row'>
          <div className='col p-4'>
            <Card style={{ width: '100% ' }}>
              <Card>
                <Rate allowHalf defaultValue={4.5} /> <br />
                <textarea
                  type='text'
                  className='form-control mt-2'
                  placeholder='Please write your feedback here'
                  maxLength='100'
                ></textarea>
                <Button type='primary' className='float-right mt-4'>
                  Submit
                </Button>
              </Card>
              <List
                itemLayout='horizontal'
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://joeschmoe.io/api/v1/random' />
                      }
                      title={
                        <Rate
                          allowHalf
                          defaultValue={item.value}
                          disabled={true}
                        />
                      }
                      description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                    />
                  </List.Item>
                )}
              />
              <div className='float-right'>
                <Button type='default'>{'<'}</Button>
                <Button type='default'>{'>'}</Button>
              </div>
            </Card>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <ProductCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
