import express from 'express';
import { requireSignin, adminMiddleware } from '../controllers/auth';
import { create } from  '../controllers/blog';

const router = express.Router();

  router.post('/blog', requireSignin, adminMiddleware, create);

export default router;
