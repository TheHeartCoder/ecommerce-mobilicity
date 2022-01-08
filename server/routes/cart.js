import express from 'express';
import { addProductToCart, getCartItems } from '../controllers/cartController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.get('/all-cart-items', authTokenVerify, getCartItems);
router.post('/all-cart-items', authTokenVerify, addProductToCart);

module.exports = router;
