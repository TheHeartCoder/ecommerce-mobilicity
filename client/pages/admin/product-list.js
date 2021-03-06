import HeadText from '../../components/HeadText';
import {
  Button,
  Table,
  Tag,
  Space,
  Pagination,
  Collapse,
  Image,
  List,
  Avatar,
} from 'antd';
import { useEffect, useState } from 'react';
import ProductFormModal from '../../components/admin/ProductFormModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { deleteProduct, getProducts } from '../../redux/actions/products';
import ImageViewer from '../../components/products/ImageViewer';

const ProductList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pImages, setPImages] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const { userInfo } = loggedInUser;
  const router = useRouter();

  const dispatch = useDispatch();

  const productData = useSelector((state) => state.productData);
  const { loading, products, success, count, page } = productData;

  useEffect(() => {
    if (userInfo.role !== 'Admin') {
      router.push('/');
    } else {
      dispatch(getProducts(curPage, limit));
    }
  }, [curPage, limit]);

  const delProduct = (slug) => {
    dispatch(deleteProduct(slug));
  };

  return (
    <>
      <HeadText
        headText='All Products'
        subText='Mangae your products from here'
      />
      <div className='row'>
        <div className='col-md-10 offset-md-1'>
          <div className='ml-auto p-4'>
            <Button
              type='primary'
              size='large'
              className='float-right'
              onClick={showModal}
            >
              Add New Product
            </Button>
          </div>
        </div>
      </div>
      <div className='col-md-10 offset-md-1'>
        <List
          className='m-4 card p-2'
          itemLayout='horizontal'
          dataSource={products ? products : []}
          loading={loading}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.images[0].Location}
                    shape='square'
                    width={80}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setPImages(item.images);
                      setVisible(true);
                    }}
                  />
                }
                title={item.name}
                description={
                  <>
                    {item.highlightDescription}
                    <br />
                    <div className='row'>
                      <div className='col-md-4'>
                        Category:
                        <span className='text-info'>{item.category.title}</span>
                      </div>
                      <div className='col-md-4'>
                        Brand:
                        <span className='text-info'>{item.brand.title}</span>
                      </div>
                      <div className='col-md-4'>
                        Color: <span className='text-info'>{item.color}</span>
                      </div>
                      <div className='col-md-4'>
                        Quantity :
                        <span className='text-info'> {item.quantity}</span>
                      </div>
                      <div className='col-md-4'>
                        Price: <span className='text-info'>${item.price}</span>
                      </div>
                    </div>
                  </>
                }
              />

              <Tag color={'blue'}>
                {item.featured ? 'Featured' : 'Not Featured'}
              </Tag>
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
                onClick={() => delProduct(item.slug)}
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
      <ImageViewer images={pImages} visible={visible} setVisible={setVisible} />
      <ProductFormModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        currentSlug={currentSlug}
        setCurrentSlug={setCurrentSlug}
        products={products}
        success={success}
        loading={loading}
      />
    </>
  );
};

export default ProductList;
