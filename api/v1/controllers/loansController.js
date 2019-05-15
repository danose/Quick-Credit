/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
import loanModel from '../models/loans';
import UserModel from '../models/users';

class LoanController {

 
  // loan application creation

  createLoan(req, res) {

    
    const repaid = loanModel.getRepaidStatus();
    const user = UserModel.getId(req.user.id);
    const getEmail = loanModel.getUserEmail(user.email);
    if (getEmail && repaid) {

      return res.status(400)
        .json({

          status: 400,
          error: 'you must repay before applying'
        });

    }
    
    
    const newLoan = loanModel.create(req.body, req.user);
    return res.status(201)
      .json({

        status: 201,
        data: {

          loanId: newLoan.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          repaid: newLoan.repaid,
          amount: newLoan.amount,
          tenor: newLoan.tenor,
          status: newLoan.status,
          paymentInstallment: newLoan.paymentInstallment,
          interest: newLoan.interest
        }
        
        
      });
     

  }

  
  // Getting a loan from the loan database

  getLoan(req, res) {

    const loan = loanModel.getOne(parseInt(req.params.loanId, 10));
    if (!loan) {
    
      return res.status(404)
        .json({
          
          status: 404,
          error: 'loan not found'

        });


    }
    return res.status(200)
      .json({

        status: 200,
        data: loan

      });

  }

  
  // Getting loans, all unpaid and repaid loans

  getLoans(req, res) {

    const loans = loanModel.getAll();
    const { repaid, status } = req.query;
    

    if (!status && !repaid) {

      return res.status(200)
        .json({
  
          status: 200,
          data: loans
        });

    }

    if (status === 'approved' && repaid === 'false') {

     
      const unPaid = loans.map((loan) => {

        if (loan.status === 'approved' && loan.repaid === false) return loan;
  
      
      });
  
      
      return res.status(200)
        .json({
    
          status: 200,
          data: unPaid
        });

    }

    if (status && status === 'approved' && repaid === 'true') {

      const rePaid = loans.map((loan) => {

        if (loan.status === 'approved' && loan.repaid === true) return loan;
  
      
      });
  
      return res.status(200)
        .json({
  
          status: 200,
          data: rePaid
  
        });

    }

    
  }


  // Approving or rejecting a loan application
  
  approveRejectLoans(req, res) {

    const loan = loanModel.getOne(parseInt(req.params.loanId, 10));
    if (!loan) {
    
      return res.status(404)
        .json({
          
          status: 404,
          error: 'loan not found'

        });

    }

    const patchedLoan = loanModel.approveLoan(parseInt(req.params.loanId, 10), req.body);

    return res.status(200)
      .json({

        status: 200,
        data: {
          loanId: patchedLoan.id,
          loanAmount: patchedLoan.amount,
          status: patchedLoan.status,
          monthlyInstallment: patchedLoan.paymentInstallment,
          interest: patchedLoan.interest

        }
      });

  }


}

  
export default new LoanController();
