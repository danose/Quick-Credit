import express from 'express';
import UserController from '../controllers/usersController';
import { validateSignIn, validateSignup } from '../middleware/userValidation';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.signUpUsers);
router.post('/auth/signin', validateSignIn, UserController.signInUsers);
router.patch('users/:userEmail/verify', UserController.verifyUser);
export default router;
