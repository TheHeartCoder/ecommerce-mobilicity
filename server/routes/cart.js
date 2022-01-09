import express from 'express';
import {
  addProductToCart,
  getCartItems,
  deleteCartItem,
} from '../controllers/cartController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.get('/all-cart-items', authTokenVerify, getCartItems);
router.post('/all-cart-items', authTokenVerify, addProductToCart);
router.delete('/all-cart-items/:productId', authTokenVerify, deleteCartItem);

module.exports = router;
