import express from 'express';
import { requireSignin, authMiddleware, adminMiddleware } from '../controllers/auth';
import { read } from '../controllers/user';

const router = express.Router();

  router.get('/profile', requireSignin, authMiddleware, read);

export default router;