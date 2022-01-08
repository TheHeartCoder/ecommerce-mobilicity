import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ItemsOnCard from './ItemsOnCard';
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
const CarouselBorad = ({ items, type }) => {
  return (
    <>
      {items && items.length && (
        <Carousel responsive={responsive}>
          {items.map((item, index) => (
            <div className='p-2' key={index + '-card'}>
              <ItemsOnCard item={item} type={type} />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default CarouselBorad;
