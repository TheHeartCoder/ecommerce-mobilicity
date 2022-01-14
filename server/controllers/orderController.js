import Order from '../models/order';

export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length > 0) {
      const newOrder = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
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

export const getOrderByID = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting order');
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for updating order');
  }
};

export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    order.isDelivered = true;
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for updating order');
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'user',
      '_id name'
    );

    res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting orders');
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', '_id name');
    res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error for getting orders');
  }
};
