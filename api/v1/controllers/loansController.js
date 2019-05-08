/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */

import userModel from '../models/users';

const loans = [];

class LoanController {

  // loan application creation
  createLoan(req, res) {

    const user = userModel.getId(req.user.id);
    const { tenor, amount } = req.body;
    

    const newLoan = {

      id: loans.length + 1,
      status: 'pending',
      tenor: parseInt(tenor, 10),
      amount: parseFloat(amount)
     
    };
    newLoan.interest = parseFloat((0.05 * newLoan.amount).toFixed(2));
    newLoan.paymentInstallment = parseFloat((newLoan.amount + parseFloat(newLoan.interest) / newLoan.tenor).toFixed(2));
    

    newLoan.balance = newLoan.amount + newLoan.interest;
    
     
    loans.push(newLoan);

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

  getOne(id) {

    return loans.find(loan => loan.id === id);

  }

  getLoan(req, res) {

    const loan = loans.filter(loanOne => loanOne.id === (parseInt(req.params.loanId, 10)))[0];
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

    const status = req.query.status;
    const repaid = req.query.repaid;

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

    const loan = loans.find(rej => rej.id === (parseInt(req.params.loanId, 10)));
    if (!loan) {
    
      return res.status(404)
        .json({
          
          status: 404,
          error: 'loan not found'

        });

    }

    const index = loans.indexOf(loan);
    
    loans[index].status = req.body.status;

    const edit = loans[index];

    return res.status(200)
      .json({

        status: 200,
        data: {
          loanId: edit.id,
          loanAmount: edit.amount,
          status: edit.status,
          monthlyInstallment: edit.paymentInstallment,
          interest: edit.interest

        }
      });

  }


}

  
export default new LoanController();
