import Wishlist from '../models/wishlist';
export const addProductToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const newWishlist = new Wishlist({
      user: req.user._id,
      products: [
        {
          product: productId,
        },
      ],
    });
    await newWishlist.save();
    return res.json(newWishlist);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Internal server error for adding product to wishlist');
  }
};

export const getWishlistItems = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      'products.product'
    );
    res.json(wishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting wishlist');
  }
};

export const deleteWishlistItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    const productIndex = wishlist.products
      .map((product) => product.product.toString())
      .indexOf(req.params.productId);
    wishlist.products.splice(productIndex, 1);
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for deleting wishlist');
  }
};
