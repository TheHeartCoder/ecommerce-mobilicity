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
	currentAdmin,
	currentCustomer,
} from '../controllers/authController';

router.post('/register', register);
router.put('/activate-user', activateUserAccount);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/current-user', authTokenVerify, currentUser);
router.get('/current-admin', authTokenVerify, currentAdmin);
router.get('/current-customer', authTokenVerify, currentCustomer);

module.exports = router;
