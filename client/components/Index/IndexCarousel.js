import { Carousel } from 'antd';

const IndexCarousel = () => {
  const onCarouselChange = () => {};

  return (
    <Carousel afterChange={onCarouselChange} className='mt-2' autoplay>
      <div>
        {/* <Image src={c1Img} alt='Picture of the author' className='banner' /> */}
        <img
          src='https://i.pinimg.com/originals/b8/ee/ed/b8eeed64f7af5d099945c89d0ab0b457.jpg'
          className='banner'
          alt='sd'
        />
      </div>
      <div>
        <img
          src='https://1.bp.blogspot.com/-RS1wY4-J7Bo/YMdpGjII0fI/AAAAAAAACoc/nj1Nw_OqadMeHqDSpWHERRyzYrMx7OvfwCLcBGAsYHQ/s1280/Product%2BBanner%2BDesign.webp'
          className='banner'
          alt='sd'
        />
      </div>
      <div>
        <img
          src='https://img.freepik.com/free-vector/modern-sale-banner-with-product-description_1361-1259.jpg?size=626&ext=jpg'
          className='banner'
          alt='sd'
        />
      </div>
      <div>
        <img
          src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/155656488/original/0c6ecaeeab2e9b46e3af35c66be9ad2e081929be/design-awesome-website-banner-or-product-banner.jpg'
          className='banner'
          alt='sd'
        />
      </div>
    </Carousel>
  );
};

export default IndexCarousel;
