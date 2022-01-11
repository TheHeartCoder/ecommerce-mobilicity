import express from 'express';

import {
	addProductToWishlist,
	getWishlistItems,
	deleteWishlistItem,
} from '../controllers/wishlistController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.post('/wishlist', authTokenVerify, addProductToWishlist);
router.get('/wishlist', authTokenVerify, getWishlistItems);
router.delete('/wishlist/:productId', authTokenVerify, deleteWishlistItem);

module.exports = router;
