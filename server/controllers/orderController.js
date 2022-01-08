import Order from '../models/order';

export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length > 0) {
      const newOrder = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
      await newOrder.save();
      return res.json(newOrder);
    } else {
      return res.status(400).send('Order items is required');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for adding order');
  }
};
