import IndexCarousel from '../components/Index/IndexCarousel';

import ProductCarousel from '../components/Index/ProductCarousel';

const index = () => {
  return (
    <div className='container'>
      <IndexCarousel />
      <div className='mt-4'>
        <h4 className='text-center'>Featured Products</h4>
        <ProductCarousel />
      </div>

      <div className='mt-4'>
        <h4 className='text-center'>Product Categories</h4>
        <ProductCarousel />
      </div>
      <div className='mt-4'>
        <h4 className='text-center'>Top Rated Products</h4>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default index;
