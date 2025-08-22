import express from 'express';
import { createOrders, verifyPayment, fetchOrders } from '../controllers/orders.js';

const router = express.Router();

router.get('/', fetchOrders);
router.post('/create', createOrders);
router.post('/verify', verifyPayment);

export default router;