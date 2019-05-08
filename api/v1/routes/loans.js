import express from 'express';
import loanController from '../controllers/loansController';
import { validateLoan } from '../middleware/loanValidation';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

const router = express.Router();

router.post('/loans', auth, validateLoan, loanController.createLoan);
router.get('/loans/:loanId', [auth, admin], loanController.getLoan);
router.patch('/loans/:loanId', [auth, admin], loanController.approveRejectLoans);
router.get('/loans', [auth, admin], loanController.getLoans);


export default router;
