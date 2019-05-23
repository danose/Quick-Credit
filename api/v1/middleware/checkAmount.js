/* eslint-disable import/prefer-default-export */
import loanModel from '../models/loans';

export const checkPaidAmount = async (req, res, next) => {
  const loan = await loanModel.getOneLoan(req.params.loanId);
  const { paidAmount } = req.body;
  const error = {};
  if (Number.parseFloat(paidAmount) !== Number.parseFloat(loan.payment_installment)){
    error.paidAmount = 'Paid Amount must be equal to installment';
  }
  if (Number.parseFloat(paidAmount) > Number.parseFloat(loan.balance)) {
    error.paidAmount = 'Loan has been fully paid';
  }
  if (Object.keys(error).length === 0 && error.constructor === Object){
    return next();
  }
  return res.status(422)
    .json({
      status: 422,
      error
    });
};
