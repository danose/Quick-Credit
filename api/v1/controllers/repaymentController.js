/* eslint-disable import/no-cycle */
import loanModel from '../models/loans';
import repaymentModel from '../models/repayment';


class RepaymentController {

  // Posting a loan repayment history

  createRepayment(req, res) {

    const loan = loanModel.getOne(parseInt(req.params.loanId, 10));
    if (!loan) {

      return res.status(404)
        .json({
          status: 404,
          error: 'loan not found'
        });

    }
    

    const newRepayment = repaymentModel.create(req.body, req.params);

    if (newRepayment.paidAmount > newRepayment.amount + loan.interest) {

      return res.status(400)
        .json({
          status: 400,
          error: 'paid amount cannot exceed loan + interest'
        });

    }

     
    return res.status(201)
      .json({

        status: 201,
        data: newRepayment
      
      });


  }
  

  // Getting a repayment history
  
  getRepayment(req, res) {

    
    const repaymentVerification = loanModel.getOne(parseInt(req.params.loanId, 10));
    if (!repaymentVerification) {

      return res.status(404)
        .json({
          status: 404,
          error: 'repayment not found'
        });

    }
    const repayOne = repaymentModel.getOne(parseInt(req.params.loanId, 10));
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
