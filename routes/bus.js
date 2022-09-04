import express from 'express';
import { create, deleteBus, getBus, getBuss, getBusSeats, update } from '../controllers/bus.js';

const router = express.Router();

router.post("/create",create);
router.put("/:id",update);
router.delete("/:id",deleteBus);
//get single bus
router.get("/find/:id",getBus);
//all filter 
router.get("/",getBuss);
//get bus and seat
router.get("/seat/:id",getBusSeats);


export default router;