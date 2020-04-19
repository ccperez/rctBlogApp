import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

  router.post('/signup', auth.signup);

export default router;
