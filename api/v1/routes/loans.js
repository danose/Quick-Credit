import express from 'express';
import loanController from '../controllers/loansController';
import { validateLoan } from '../middleware/loanValidation';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import adminPrevent from '../middleware/preventAdmin';

const router = express.Router();

router.post('/loans', [auth, adminPrevent], validateLoan, loanController.createLoan); // post loan application
router.get('/loans/:loanId', [auth, admin], loanController.getLoan); // Get a single loan application
router.patch('/loans/:loanId', [auth, admin], loanController.approveRejectLoans); // Approve or reject loan applications
router.get('/loans', [auth, admin], loanController.getLoans); // Get all loans, unpaid and repaid loans


export default router;
