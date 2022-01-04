import { Card, Pagination, Select, Slider } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeadText from '../../components/HeadText';
import ItemsOnCard from '../../components/Index/ItemsOnCard';
import Loader from '../../components/loader';
import ProductFilter from '../../components/products/ProductFilter';
import { getBrands } from '../../redux/actions/brand';
import { getCategories } from '../../redux/actions/categories';
import { getProducts } from '../../redux/actions/products';

const { Option } = Select;
const ProductIndex = () => {
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    brand: '',
    highestPrice: '',
    lowestPrice: '',
  });

  const productData = useSelector((state) => state.productData);
  const { loading, products, success, count, page } = productData;

  const categoriesData = useSelector((state) => state.categoryData);
  const { loading: loading1, categories } = categoriesData;

  const brandData = useSelector((state) => state.brandData);
  const { loading: loading2, brands } = brandData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(curPage, limit, sort, order, '', filter));
  }, [curPage, limit, sort, order, filter]);

  useEffect(() => {
    dispatch(getCategories(1));
    dispatch(getBrands(1));
  }, []);

  return (
    <>
      <HeadText headText='Products' subText='All Products are display here' />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2 pl-4 pr-2'>
            <ProductFilter
              filter={filter}
              setFilter={setFilter}
              categories={categories}
              brands={brands}
            />
          </div>
          <br />
          {loading ? (
            <Loader />
          ) : (
            <div className='col-md-10 pr-4'>
              <Card style={{ width: '100% ' }}>
                <div className='row'>
                  <Select
                    defaultValue=''
                    style={{ width: '200px' }}
                    className='ml-auto p-2'
                    onChange={(value) => {
                      setSort(value.split('-')[0]);
                      setOrder(value.split('-')[1]);
                    }}
                    value={sort ? sort + '-' + order : ''}
                  >
                    <Option value=''>Sorting</Option>
                    <Option value='price-asc'>Price : Low To High</Option>
                    <Option value='price-desc'>Price : Hight To Low</Option>
                    <Option value='rating-desc'>Rating: High To Low</Option>
                  </Select>
                </div>
                <div className='row'>
                  {products &&
                    products.map((product, i) => (
                      <div className='col-md-3 p-2' key={i}>
                        <ItemsOnCard item={product} type={'products'} />
                      </div>
                    ))}
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
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductIndex;
