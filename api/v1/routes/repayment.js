import express from 'express';
import repaymentController from '../controllers/repaymentController';
import { validateRepayment } from '../middleware/repaymentValidation';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

router.post('/loans/:loanId/repayment', [auth, admin], validateRepayment, repaymentController.createRepayment);
router.get('/loans/:loanId/repayments', auth, repaymentController.getRepayment);


export default router;
