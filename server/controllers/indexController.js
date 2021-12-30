import Brand from '../models/brand';
import Category from '../models/category';
import Product from '../models/product';
import Banner from '../models/banner';
export const getIndexItems = async (req, res) => {
  try {
    const categories = await Category.find({});
    const brands = await Brand.find({});
    const products = await Product.find({ featured: true });
    const banners = await Banner.find({});
    res.json({ categories, brands, products, banners });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
};
