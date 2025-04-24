import express from 'express';
import { getDistribution, confirmPayment, getReceipt } from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/distribute', auth, getDistribution);
router.post('/confirm', auth, confirmPayment);
router.get('/receipt/:receiptId', auth, getReceipt);

export default router;