import Cart from '../models/cart';
export const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const existCart = await Cart.findOne({ user: req.user._id });
    if (!existCart) {
      const newCart = new Cart({
        user: req.user._id,
        products: [
          {
            product: productId,
            quantity,
          },
        ],
      });
      await newCart.save();
      return res.json(newCart);
    } else {
      const productExist = existCart.products.find(
        (product) => product.product.toString() === productId
      );
      if (productExist) {
        productExist.quantity = quantity;
        await existCart.save();
        return res.json(existCart);
      } else {
        existCart.products.push({
          product: productId,
          quantity,
        });
        await existCart.save();
        return res.json(existCart);
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('Internal server error for adding product to cart');
  }
};

export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'products.product'
    );
    res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting cart');
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    const productIndex = cart.products
      .map((product) => product.product.toString())
      .indexOf(req.params.productId);
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for deleting cart');
  }
};
