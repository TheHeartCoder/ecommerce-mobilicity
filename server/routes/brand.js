import express from 'express';
import {
	addBrand,
	updateBrand,
	deleteBrand,
	getBrand,
	getBrands,
} from '../controllers/brandController';

const router = express.Router();

import { authTokenVerify, isAdmin, isCustomer } from '../middleware';

router.post('/add-brand', authTokenVerify, isAdmin, addBrand);
router.post('/update-brand/:slug', authTokenVerify, isAdmin, updateBrand);
router.delete('/delete-brand/:slug', authTokenVerify, isAdmin, deleteBrand);
router.get('/get-brand/:slug', getBrand);
router.get('/all-brand', getBrands);

module.exports = router;
