import express from 'express';
import repaymentController from '../controllers/repaymentController';
import { validateRepayment } from '../middleware/repaymentValidation';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

router.post('/loans/:loanId/repayment', [auth, admin], validateRepayment, repaymentController.createRepayment); // Post loan repayments
router.get('/loans/:loanId/repayments', auth, repaymentController.getRepayment); // Get loan repayment history


export default router;
