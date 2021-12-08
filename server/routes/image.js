import express from 'express';
import {
  removeImage,
  uploadImage,
  uploadMultipleImage,
  removeMultipleImage,
} from '../controllers/imageController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.post('/image-upload', uploadImage);
router.post('/image-remove', authTokenVerify, removeImage);
router.post('/all-image-upload', authTokenVerify, uploadMultipleImage);
router.post('/all-image-remove', authTokenVerify, removeMultipleImage);

module.exports = router;
