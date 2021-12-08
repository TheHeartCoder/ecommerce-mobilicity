import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryFormModal from '../../components/admin/CategoryFormModal';
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

const CategoryList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();
  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <HeadText
        headText='All Product Categories'
        subText='Mangae your product categories from here'
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
              Add New Category
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
      <CategoryFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default CategoryList;
