import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Pagination } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryFormModal from '../../components/admin/CategoryFormModal';
import HeadText from '../../components/HeadText';
import { deleteCategory, getCategories } from '../../redux/actions/categories';

const CategoryList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();

  const dispatch = useDispatch();

  const categoriesData = useSelector((state) => state.categoryData);
  const { loading, categories, success } = categoriesData;

  const [currentSlug, setCurrentSlug] = useState(null);

  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    } else {
      dispatch(getCategories());
    }
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const delCategory = (slug) => {
    dispatch(deleteCategory(slug));
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
          className='m-4 card p-2'
          itemLayout='horizontal'
          dataSource={categories}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image?.Location} shape='square' />}
                title={item.title}
                description={item.description}
              />
              <button
                className='btn btn-secondary'
                onClick={() => {
                  setCurrentSlug(item.slug);
                }}
              >
                <EditOutlined />
              </button>

              <button
                className='btn btn-danger m-2'
                onClick={() => delCategory(item.slug)}
              >
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
        loading={loading}
        success={success}
        currentSlug={currentSlug}
        categories={categories}
        setCurrentSlug={setCurrentSlug}
      />
    </>
  );
};

export default CategoryList;
