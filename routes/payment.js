import express from 'express';
import { initpayment,successPayment,failPayment,cancelPayment } from '../controllers/payment.js';

const router = express.Router();

router.post("/init",initpayment);
router.post("/success",successPayment);
router.post("/fail",failPayment);
router.post("/cancel",cancelPayment);

export default router;
