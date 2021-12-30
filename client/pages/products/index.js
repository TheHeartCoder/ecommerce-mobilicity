import { Card, Pagination, Select, Slider } from 'antd';
import HeadText from '../../components/HeadText';
import ItemsOnCard from '../../components/Index/ItemsOnCard';
import ProductFilter from '../../components/products/ProductFilter';

const { Option } = Select;
const ProductIndex = () => {
  return (
    <>
      <HeadText headText='Products' subText='All Products are display here' />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2 pl-4 pr-2'>
            <ProductFilter />
          </div>
          <br />
          <div className='col-md-10 pr-4'>
            <Card style={{ width: '100% ' }}>
              <div className='row'>
                <Select
                  defaultValue=''
                  style={{ width: '200px' }}
                  className='ml-auto p-2'
                >
                  <Option value=''>Sorting</Option>
                  <Option value='Jack'>Price : Low To High</Option>
                  <Option value='Jack'>Price : Hight To Low</Option>
                  <Option value='Lucy'>Rating: High To Low</Option>
                </Select>
              </div>
              <div className='row'>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
                <div className='col-md-3 p-2'>
                  <ItemsOnCard />
                </div>
              </div>

              <div className='row'>
                <div className='m-auto p-4'>
                  <Pagination
                    size='small'
                    total={50}
                    showSizeChanger
                    showQuickJumper
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductIndex;
