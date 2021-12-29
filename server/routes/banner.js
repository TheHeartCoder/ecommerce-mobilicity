import express from 'express';
import {
  addBanner,
  deleteBanner,
  getBanner,
  getBanners,
  updateBanner,
} from '../controllers/bannerController';

const router = express.Router();

import { authTokenVerify, isAdmin } from '../middleware';

router.post('/add-banner', authTokenVerify, isAdmin, addBanner);
router.post('/update-banner/:id', authTokenVerify, isAdmin, updateBanner);
router.delete('/delete-banner/:id', authTokenVerify, isAdmin, deleteBanner);
router.get('/get-banner/:id', getBanner);
router.get('/all-banner', getBanners);

module.exports = router;
