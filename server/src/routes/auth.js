import express from 'express';
import { signup} from '../controllers/auth';
// validators
import { runValidation } from '../validators';
import { userSignupValidator } from '../validators/auth';

const router = express.Router();

  router.post('/signup', userSignupValidator, runValidation, signup);

export default router;
