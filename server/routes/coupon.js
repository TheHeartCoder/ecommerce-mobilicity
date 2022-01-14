import express from 'express';

import {
  addCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
  getCoupons,
} from '../controllers/couponController';

const router = express.Router();

import { authTokenVerify, isAdmin } from '../middleware';

router.post('/add-coupon', authTokenVerify, isAdmin, addCoupon);
router.post('/update-coupon/:id', authTokenVerify, isAdmin, updateCoupon);
router.delete('/delete-coupon/:id', authTokenVerify, isAdmin, deleteCoupon);
router.get('/get-coupon/:id', getCoupon);
router.get('/all-coupon', authTokenVerify, getCoupons);

module.exports = router;
