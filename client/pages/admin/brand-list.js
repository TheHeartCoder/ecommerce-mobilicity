import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Avatar, Button, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BrandFormModal from '../../components/admin/BrandFormModal';
import HeadText from '../../components/HeadText';
import { deleteBrand, getBrands } from '../../redux/actions/brand';
import { useRouter } from 'next/router';

const BrandList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();

  const dispatch = useDispatch();

  const brandData = useSelector((state) => state.brandData);
  const { loading, brands, success, count } = brandData;

  const [currentSlug, setCurrentSlug] = useState(null);

  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    } else {
      dispatch(getBrands(curPage, limit));
    }
  }, [curPage, limit]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const delBrand = (slug) => {
    dispatch(deleteBrand(slug));
  };
  return (
    <>
      <HeadText headText='All Brands' subText='Mangae your brands from here' />
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div className='ml-auto p-4'>
            <Button
              type='primary'
              size='large'
              className='float-right'
              onClick={showModal}
            >
              Add New Brand
            </Button>
          </div>
        </div>
      </div>

      <div className='col-md-8 offset-md-2'>
        <List
          className='m-4 card p-2'
          itemLayout='horizontal'
          dataSource={brands}
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
                onClick={() => setCurrentSlug(item.slug)}
              >
                <EditOutlined />
              </button>

              <button
                className='btn btn-danger m-2'
                onClick={() => {
                  delBrand(item.slug);
                }}
              >
                <DeleteOutlined />
              </button>
            </List.Item>
          )}
        />
      </div>
      <div className='row'>
        <div className='m-auto p-4'>
          <Pagination
            size='small'
            total={count}
            showSizeChanger
            showQuickJumper
            current={curPage}
            pageSize={limit}
            onChange={(page, pageSize) => {
              setCurPage(page);
              setLimit(pageSize);
            }}
          />
        </div>
      </div>
      <BrandFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        loading={loading}
        success={success}
        currentSlug={currentSlug}
        brands={brands}
        setCurrentSlug={setCurrentSlug}
      />
    </>
  );
};

export default BrandList;
