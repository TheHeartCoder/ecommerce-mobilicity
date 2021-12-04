import express from 'express';

import {
	addProduct,
	updateProduct,
	deleteProduct,
	getProduct,
	getProducts,
} from '../controllers/productController';

const router = express.Router();

import { authTokenVerify, isAdmin, isCustomer } from '../middleware';

router.post('/add-product', authTokenVerify, isAdmin, addProduct);
router.post('/update-product/:slug', authTokenVerify, isAdmin, updateProduct);
router.post('/delete-product/:slug', authTokenVerify, isAdmin, deleteProduct);
router.post('/get-product/:slug', getProduct);
router.post('/all-products', getProducts);

module.exports = router;
