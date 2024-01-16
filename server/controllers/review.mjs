import { db } from "../db.mjs";

export const getReviews = (req, res) => {
  const q = req.query.motorcycle_id
    ? "SELECT r.*, u.username, m.brand AS motorcycle_brand, m.model AS motorcycle_model FROM reviews r JOIN users u ON r.user_id = u.id JOIN motorcycles m ON r.motorcycle_id = m.id WHERE r.motorcycle_id=?"
    : "SELECT r.*, u.username, m.brand AS motorcycle_brand, m.model AS motorcycle_model FROM reviews r JOIN users u ON r.user_id = u.id JOIN motorcycles m ON r.motorcycle_id = m.id";

  db.query(q, [req.query.motorcycle_id], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getReview = (req, res) => {
  const q =
    "SELECT r.id, u.username, r.user_id, r.motorcycle_id, r.rating, r.content, r.image_url, r.created_at FROM users u JOIN reviews r ON u.id = r.user_id WHERE r.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addReview = (req, res) => {
  const q =
    "INSERT INTO reviews(`user_id`, `motorcycle_id`, `rating`, `content`, `image_url`, `created_at`) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.user_id,
    req.body.motorcycle_id,
    req.body.rating,
    req.body.content,
    req.body.image_url,
    req.body.created_at,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Review has been added.");
  });
};

export const deleteReview = (req, res) => {
  const reviewId = req.params.id;
  const q = "DELETE FROM reviews WHERE `id` = ?";

  db.query(q, [reviewId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json("Review has been deleted!");
  });
};

export const updateReview = (req, res) => {
  const reviewId = req.params.id;
  const q =
    "UPDATE reviews SET `rating`=?, `content`=?, `image_url`=? WHERE `id` = ?";

  const values = [req.body.rating, req.body.content, req.body.image_url];

  db.query(q, [...values, reviewId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Review has been updated.");
  });
};