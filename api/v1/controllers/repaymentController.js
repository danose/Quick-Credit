/* eslint-disable import/no-cycle */
import loanController from './loansController';

const repayment = [];

class RepaymentController {

  // Posting a loan repayment history

  createRepayment(req, res) {

    const loan = loanController.getOne(parseInt(req.params.loanId, 10));
    if (!loan) {

      return res.status(404)
        .json({
          status: 404,
          error: 'loan not found'
        });

    }

    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const newRepayment = {
      id: repayment.length + 1,
      loanId: loan.id,
      amount: loan.amount,
      monthlyInstallment: loan.paymentInstallment,
      paidAmount: parseFloat(req.body.paidAmount),
      createdOn: date.toISOString()
    };

    newRepayment.balance = parseFloat(((newRepayment.amount + loan.interest) - parseFloat(newRepayment.paidAmount)).toFixed(2));
    loan.balance = newRepayment.balance;
    loan.createdOn = newRepayment.createdOn;
    if (loan.balance === 0) {

      loan.repaid = true;

    }
    if (loan.balance > 0) {

      loan.repaid = false;

    }

    if (newRepayment.paidAmount > newRepayment.amount + loan.interest) {

      return res.status(400)
        .json({
          status: 400,
          error: 'paid amount cannot exceed loan + interest'
        });

    }

    repayment.push(newRepayment);

    
    return res.status(201)
      .json({

        status: 201,
        data: newRepayment
      
      });


  }
  // comparing id in repayment array with loan id

  getOne(id) {

    return repayment.find(repay => repay.loanId === id);

  }
  // Getting a repayment history
  
  getRepayment(req, res) {

    
    const repaymentVerification = loanController.getOne(parseInt(req.params.loanId, 10));
    if (!repaymentVerification) {

      return res.status(404)
        .json({
          status: 404,
          error: 'repayment not found'
        });

    }
    const repayOne = repayment
      .filter(repay => repay.loanId === parseInt(req.params.loanId, 10))[0];
    return res.status(200)
      .json({
        status: 200,
        data: {
          loanId: repayOne.loanId,
          createdOn: repayOne.createdOn,
          monthlyInstallment: repayOne.monthlyInstallment,
          amount: repayOne.amount,
          balance: repayOne.balance
        }
      
      });

  }

}

export default new RepaymentController();
