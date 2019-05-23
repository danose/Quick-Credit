/* eslint-disable consistent-return */

import loanModel from '../models/loans';


class LoanController {
  /**
     * Loan creation
     * @param {object} req
     * @param {object} res
     * @returns {object} loan json object
     * @returns {object} error object
     */
  async createLoan(req, res) {
    const getStatus = await loanModel.getRepaidStatus(req.user);
    if (getStatus) {
      return res.status(400).json({ status: 400, error: 'you must repay before applying' });
    }
    const newLoan = await loanModel.createLoan(req.body, req.user);
    return res.status(201)
      .json({
        status: 201,
        data: {
          loanId: newLoan.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          amount: newLoan.amount,
          tenor: newLoan.tenor,
          status: newLoan.status,
          paymentInstallment: newLoan.payment_installment,
          interest: newLoan.interest
        }
      });
  }

  
  /**
     * Get a single loan
     * @param {object} req
     * @param {object} res
     * @returns {object} loan json object
     * @returns {object} error object
     */

  async getLoan(req, res) {
    try {
      const loan = await loanModel.getOneLoan(req.params.loanId);
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
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  
  /**
     * Get a single loan
     * @param {object} req
     * @param {object} res
     * @returns {array} loans array
     */

  async getLoans(req, res) {
    const loans = await loanModel.getAllLoans();
    const { repaid, status } = req.query;
    if (!status && !repaid) {
      return res.status(200).json({ status: 200, data: loans });
    }

    if (status === 'approved' && repaid === 'false') {
      const unPaid = await loanModel.getAllStatus(false);
      if (unPaid.length === 0){
        return res.status(404).json({ status: 404, error: 'There are no unpaid Loans' });
      }
      return res.status(200).json({ status: 200, data: unPaid });
    }

    if (status && status === 'approved' && repaid === 'true') {
      const rePaid = await loanModel.getAllStatus(true);
      if (rePaid.length === 0){
        return res.status(404).json({ status: 404, error: 'There are no Repaid Loans' });
      }
      return res.status(200)
        .json({ status: 200, data: rePaid });
    }
  }


  /**
     * Approve or reject a single loan
     * @param {object} req
     * @param {object} res
     * @returns {object} loan json object
     * @returns {object} error object
     */
  
  async approveRejectLoans(req, res) {
    try {
      const patchedLoan = await loanModel.approveLoan(req.params.loanId, req.body);
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
    } catch (error) {
      const loan = await loanModel.getOneLoan(req.params.loanId);
      if (!loan) {
        return res.status(404)
          .json({ status: 404, error: 'loan not found' });
      }
      return res.status(400).json(error);
    }
  }
}

  
export default new LoanController();
