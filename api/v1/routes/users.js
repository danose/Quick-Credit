import express from 'express';
import UserController from '../controllers/usersController';
import { validateSignIn, validateSignup } from '../middleware/userValidation';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.signUpUsers); // User signup
router.post('/auth/signin', validateSignIn, UserController.signInUsers); // User signin
router.patch('/users/:userEmail/verify', [auth, admin], UserController.verifyUser); // Verify User


export default router;
