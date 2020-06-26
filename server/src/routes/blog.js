import express from 'express';
import { create } from  '../controllers/blog';

const router = express.Router();

  router.post('/blog', requireSign);

export default router;
