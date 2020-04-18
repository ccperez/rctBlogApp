import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ time: Date().toString() });
});

export default router;
