import { useState, useEffect } from 'react';
import IndexCarousel from '../components/Index/IndexCarousel';
import CarouselBorad from '../components/Index/CarouselBorad';
import { getIndexItemsFromServer } from '../services/indexService';
import Loader from '../components/loader';

const index = () => {
  const [loading, setLoading] = useState(false);
  const [allBanners, setAllBanners] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    getItemsForIndex();
  }, []);

  const getItemsForIndex = async () => {
    try {
      setLoading(true);
      const result = await getIndexItemsFromServer();
      if (result) {
        const { banners, brands, categories, products } = result;
        if (banners.length) {
          setAllBanners(banners);
        }
        if (brands.length) {
          setAllBrands(brands);
        }
        if (products.length) {
          setAllProducts(products);
        }
        if (categories.length) {
          setAllCategories(categories);
        }
      }
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <IndexCarousel banners={allBanners} />
          <div className='mt-4'>
            <h4 className='text-center'>Featured Products</h4>
            <CarouselBorad items={allProducts} type={'products'} />
          </div>

          <div className='mt-4'>
            <h4 className='text-center'>Product Categories</h4>
            <CarouselBorad items={allCategories} type={'categories'} />
          </div>
          <div className='mt-4'>
            <h4 className='text-center'>Al Brands</h4>
            <CarouselBorad items={allBrands} type={'brands'} />
          </div>
        </div>
      )}
    </>
  );
};

export default index;
