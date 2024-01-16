// server/routes/orders.mjs
import express from 'express';
import {
  createOrder,
  getOrders,
  createTestDrive,
  getTestDrives,
  updateOrderStatus,
  updateTestDriveStatus,
} from '../controllers/orders.mjs';

const router = express.Router();

// Роуты для заказов
router.post('/', createOrder);
router.get('/all/:userId', getOrders);
router.put('/update-order-status/:orderId', updateOrderStatus);

// Роуты для тест-драйвов
router.post('/test-drives', createTestDrive);
router.get('/test-drives/all/:userId', getTestDrives);
router.put('/test-drives/update-status/:testDriveId', updateTestDriveStatus);

export default router;
