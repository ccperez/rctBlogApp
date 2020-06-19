import express from 'express';
import { create, list, read, remove }  from '../controllers/category';

// validators
import { runValidation } from '../validators';
import { categoryCreateValidator } from '../validators/category';
import { requireSignin, adminMiddleware } from '../controllers/auth';

const router = express.Router();

	router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
	router.get('/categories', list);
	router.get('/category/:slug', read);
	router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

export default router;