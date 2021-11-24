import HeadText from '../../components/HeadText';
import { List, Avatar, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
const MyWishlist = () => {
  return (
    <>
      <HeadText
        headText='Your Wishlist'
        subText='Feel free to buy or checkout these products'
      />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000' />
                  }
                  title={<a href='https://ant.design'>{item.title}</a>}
                  description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                />
                <h className='text-info mr-4'>$250</h>

                <button
                  className='btn btn-outline-danger p-2'
                  onClick={() => {}}
                >
                  <DeleteOutlined />
                </button>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 offset-md-3 text-center'>
          <Button type='default' className='m-2'>
            Show more
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyWishlist;
