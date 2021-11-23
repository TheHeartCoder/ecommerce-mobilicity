import IndexCarousel from '../components/Index/IndexCarousel';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from '../components/Index/ProductCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const index = () => {
  return (
    <div className='container'>
      <IndexCarousel />
      <div className='mt-4'>
        <h4 className='text-center'>Featured Products</h4>
        <Carousel responsive={responsive}>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div>
            <ProductCard />
          </div>
        </Carousel>
      </div>

      <div className='mt-4'>
        <h4 className='text-center'>Product Categories</h4>
        <Carousel responsive={responsive}>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
        </Carousel>
      </div>
      <div className='mt-4'>
        <h4 className='text-center'>Top Rated Products</h4>
        <Carousel responsive={responsive}>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
          <div className='p-2'>
            <ProductCard />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default index;
