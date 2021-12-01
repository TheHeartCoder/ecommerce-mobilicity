import express from 'express';

const router = express.Router();

import { authTokenVerify } from '../middleware';

import {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  activateUserAccount,
} from '../controllers/authController';

router.post('/register', register);
router.put('/activate-user', activateUserAccount);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current-user', authTokenVerify, currentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
