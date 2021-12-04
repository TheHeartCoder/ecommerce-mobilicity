import express from 'express';
import {
	addCategory,
	updateCategory,
	deleteCategory,
	getCategories,
	getCategory,
} from '../controllers/categoryController';

const router = express.Router();

import { authTokenVerify, isAdmin, isCustomer } from '../middleware';

router.post('/add-category', authTokenVerify, isAdmin, addCategory);
router.post('/update-category/:slug', authTokenVerify, isAdmin, updateCategory);
router.post('/delete-category/:slug', authTokenVerify, isAdmin, deleteCategory);
router.post('/get-category/:slug', getCategory);
router.post('/all-category', getCategories);

module.exports = router;
