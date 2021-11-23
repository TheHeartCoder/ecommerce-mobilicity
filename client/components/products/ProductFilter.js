import { Card, Select, Slider } from 'antd';

const { Option } = Select;
const ProductFilter = () => {
  return (
    <Card style={{ width: '100% ' }}>
      <h4 className='text-center text-primary'>Filter</h4>
      <hr />
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Categories</h6>
        <Select defaultValue='All' style={{ width: '100%' }}>
          <Option value='All'>All</Option>
          <Option value='Jack'>Jack</Option>
          <Option value='Lucy'>Lucy</Option>
          <Option value='yiminghe'>yiminghe</Option>
        </Select>
      </div>
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Brands</h6>
        <Select defaultValue='All' style={{ width: '100%' }}>
          <Option value='All'>All</Option>
          <Option value='Jack'>Jack</Option>
          <Option value='Lucy'>Lucy</Option>
          <Option value='yiminghe'>yiminghe</Option>
        </Select>
      </div>
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Price</h6>
        <Slider range defaultValue={[20, 50]} />
      </div>
    </Card>
  );
};

export default ProductFilter;
