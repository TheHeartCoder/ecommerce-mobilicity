import { Carousel } from 'antd';

const IndexCarousel = ({ banners }) => {
  const onCarouselChange = () => {};

  return (
    <>
      {banners.length && (
        <Carousel afterChange={onCarouselChange} className='mt-2' autoplay>
          {banners.map((banner, index) => (
            <div key={index + '-banner'}>
              <img
                src={banner.image?.Location}
                className='banner'
                alt={banner.image?.ETag}
              />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default IndexCarousel;
