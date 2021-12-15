import express from 'express';
import {
  removeImage,
  uploadImage,
  uploadMultipleImage,
  removeMultipleImage,
} from '../controllers/imageController';

const router = express.Router();

import { authTokenVerify, isAdmin } from '../middleware';

router.post('/image-upload', authTokenVerify, isAdmin, uploadImage);
router.post('/image-remove', authTokenVerify, isAdmin, removeImage);
router.post('/all-image-upload', authTokenVerify, isAdmin, uploadMultipleImage);
router.post('/all-image-remove', authTokenVerify, isAdmin, removeMultipleImage);

module.exports = router;
