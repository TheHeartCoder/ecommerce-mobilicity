import express from 'express';
import { getIndexItems } from '../controllers/indexController';

const router = express.Router();

router.get('/get-index-items', getIndexItems);
module.exports = router;
