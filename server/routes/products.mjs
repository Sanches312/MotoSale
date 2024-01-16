import express from 'express';
import { getMotorcycles, getEquipment } from '../controllers/products.mjs';

const router = express.Router();

router.get('/motorcycles', getMotorcycles);
router.get('/equipment', getEquipment);

export default router;
