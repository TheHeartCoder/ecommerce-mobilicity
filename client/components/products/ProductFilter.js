import { Card, Select } from 'antd';

const { Option } = Select;
const ProductFilter = ({
  filter,
  setFilter,
  categories,
  brands,
  resetFilter,
}) => {
  return (
    <Card style={{ width: '100% ' }}>
      <h4 className='text-center text-primary'>Filter</h4>
      <hr />
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Categories</h6>
        <Select
          value={filter.category}
          style={{ width: '100%' }}
          onChange={(value) => setFilter({ ...filter, category: value })}
        >
          <Option value=''>All</Option>
          {categories &&
            categories.map((category, i) => (
              <Option value={category._id} key={i}>
                {category.title}
              </Option>
            ))}
        </Select>
      </div>
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Brands</h6>
        <Select
          style={{ width: '100%' }}
          value={filter.brand}
          onChange={(value) => setFilter({ ...filter, brand: value })}
        >
          <Option value=''>All</Option>
          {brands &&
            brands.map((brand, i) => (
              <Option value={brand._id} key={i}>
                {brand.title}
              </Option>
            ))}
        </Select>
      </div>
      <div className='p-2' style={{ border: '1px soild #999898' }}>
        <h6 className='text-center text-info'>Price</h6>
        <div className='row'>
          <div className='col'>
            <Select
              value={filter.lowestPrice}
              style={{ width: '100%' }}
              onChange={(value) => setFilter({ ...filter, lowestPrice: value })}
            >
              <Option value={0}>Min</Option>
              <Option value={2000}>2000</Option>
              <Option value={5000}>5000</Option>
              <Option value={8000}>8000</Option>
              <Option value={12000}>12000</Option>
              <Option value={20000}>20000</Option>
              <Option value={28000}>28000</Option>
              <Option value={35000}>35000</Option>
            </Select>
          </div>
          <div className='col'>
            <Select
              value={filter.highestPrice}
              style={{ width: '100%' }}
              onChange={(value) =>
                setFilter({ ...filter, highestPrice: value })
              }
            >
              <Option value={2000}>2000</Option>
              <Option value={5000}>5000</Option>
              <Option value={8000}>8000</Option>
              <Option value={12000}>12000</Option>
              <Option value={20000}>20000</Option>
              <Option value={28000}>28000</Option>
              <Option value={35000}>35000</Option>
              <Option value=''>50000+</Option>
            </Select>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button
              className='btn btn-info mt-4 btn-block'
              onClick={resetFilter}
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductFilter;
