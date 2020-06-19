import express from 'express';

// controllers
import { requireSignin, adminMiddleware } from '../controllers/auth';
import { create, list, read, remove } from '../controllers/tag';

// validators
import { runValidation } from '../validators';
import { createTagValidator } from '../validators/tag';

const router = express.Router();
	router.post('/tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
	router.get('/tags', list);
	router.get('/tag/:slug', read);
	router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);
export default router;