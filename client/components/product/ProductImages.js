import React from 'react';
import { Card } from 'antd';
import Carousel from 'react-multi-carousel';
const responsiveForProductImages = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductImages = () => {
  return (
    <Card style={{ width: '100% ' }}>
      <Carousel
        showDots={true}
        responsive={responsiveForProductImages}
        className='p-4 text-center'
        arrows={false}
      >
        <div>
          <img
            src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-product-red-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629907845000'
            style={{ height: '300px', width: '300px' }}
            alt=''
          />
        </div>
        <div>
          <img
            src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000'
            style={{ height: '300px', width: '300px' }}
            alt=''
          />
        </div>
        <div>
          <img
            src='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1629842667000'
            style={{ height: '300px', width: '300px' }}
            alt=''
          />
        </div>
      </Carousel>
    </Card>
  );
};

export default ProductImages;
