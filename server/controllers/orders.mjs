// server/controllers/orders.mjs
import { db } from '../db.mjs';

// Создание заказа
export const createOrder = async (req, res) => {
  try {
    const { user_id, product_category, product_id, status } = req.body;

    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO orders (user_id, product_category, product_id, status) VALUES (?, ?, ?, ?)',
        [user_id, product_category, product_id, status],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    const orderId = result.insertId;

    res.status(201).json({ id: orderId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Получение заказов
export const getOrders = async (req, res) => {
  try {
    const orders = await new Promise((resolve, reject) => {
      db.query(`
        SELECT o.*, m.brand, m.model, e.brand AS equipment_brand, e.model AS equipment_model
        FROM orders o
        LEFT JOIN motorcycles m ON o.product_category = 'motorcycle' AND o.product_id = m.id
        LEFT JOIN equipment e ON o.product_category = 'equipment' AND o.product_id = e.id
      `, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Обновление статуса заказа
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        [newStatus, orderId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Создание тест-драйва
export const createTestDrive = async (req, res) => {
  try {
    const { user_id, motorcycle_id, status } = req.body;

    const result = await new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO test_drives (user_id, motorcycle_id, status) VALUES (?, ?, ?)',
        [user_id, motorcycle_id, status],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    const testDriveId = result.insertId;

    res.status(201).json({ id: testDriveId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Получение тест-драйвов
export const getTestDrives = async (req, res) => {
  try {
    const testDrives = await new Promise((resolve, reject) => {
      db.query(`
        SELECT t.*, m.brand, m.model
        FROM test_drives t
        LEFT JOIN motorcycles m ON t.motorcycle_id = m.id
      `, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(testDrives);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Обновление статуса тест-драйва
export const updateTestDriveStatus = async (req, res) => {
  try {
    const { testDriveId } = req.params;
    const { newStatus } = req.body;

    await new Promise((resolve, reject) => {
      db.query(
        'UPDATE test_drives SET status = ? WHERE id = ?',
        [newStatus, testDriveId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: 'Test Drive status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};