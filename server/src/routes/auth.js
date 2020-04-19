import express from 'express';
import { signup, signin, signout, requireSignin } from '../controllers/auth';
// validators
import { runValidation } from '../validators';
import { userSignupValidator, userSigninValidator } from '../validators/auth';

const router = express.Router();

  router.post('/signup', userSignupValidator, runValidation, signup);
  router.post('/signin', userSigninValidator, runValidation, signin);
  router.get('/signout', signout);
  // test
  router.get('/secret', requireSignin, (req, res) => {
      res.json({
          message: 'you have access to secret page'
      });
  });

export default router;
