import express from 'express';
import { getAllReserve, reserve,getReserve } from '../controllers/reserve.js';

const router = express.Router();

router.post("/",reserve);
router.get("/all",getAllReserve);
router.get("/:id",getReserve);
export default router;