import express from 'express';
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.post('/orders', authTokenVerify, addOrderItems);
router.post('/orders/pay/:id', authTokenVerify, updateOrderToPaid);
router.post('/orders/deliver/:id', authTokenVerify, updateOrderToDelivered);
router.get('/orders/:id', authTokenVerify, getOrderByID);
router.get('/orders/me', authTokenVerify, getMyOrders);
router.get('/orders', authTokenVerify, getOrders);

module.exports = router;
