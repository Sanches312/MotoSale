import { db } from '../db.mjs';

export const getMotorcycles = (req, res) => {
  const query = 'SELECT * FROM motorcycles';
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const getEquipment = (req, res) => {
  const query = 'SELECT * FROM equipment';
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};
