import express from 'express';
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAddressesForAUser,
} from '../controllers/addressController';

const router = express.Router();

import { authTokenVerify } from '../middleware';

router.post('/addresses', authTokenVerify, addAddress);
router.put('/addresses/:id', authTokenVerify, updateAddress);
router.delete('/addresses/:id', authTokenVerify, deleteAddress);
router.get('/addresses', authTokenVerify, getAddress);
router.get('/addresses/user', authTokenVerify, getAddressesForAUser);

module.exports = router;
