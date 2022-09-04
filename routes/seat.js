import express from 'express';
import { create,updateSeatAvailability } from '../controllers/seat.js';

const router = express.Router();

router.post("/:busId",create);
router.put("/availability/:id",updateSeatAvailability);

export default router;