/* eslint-disable import/no-cycle */
import Repayment from '../models/repayment';


class RepaymentController {
  /**
     * Create repayment history
     * @param {object} req
     * @param {object} res
     * @returns {object} repayment json object
     * @returns {object} error object
     */
  async createRepayment(req, res) {
    try {
      await Repayment.updateLoan(req.params.loanId, req.body);
      const newRepayment = await Repayment.createRepayment(req.body, req.params.loanId);
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      return res.status(201)
        .json({
          status: 201,
          data: newRepayment
        });
    } catch (error){
      const repaymentVerification = await Repayment.getOneLoan(req.params.loanId);
      if (!repaymentVerification) {
        return res.status(404)
          .json({
            status: 404,
            error: 'repayment not found'
          });
      }
      return res.status(400).json(error);
    }
  }
  
  /**
     * Get repayment history
     * @param {object} req
     * @param {object} res
     * @returns {object} repayment json object
     * @returns {object} error object
     */
  
  async getRepayment(req, res) {
    try {
      const repayOne = await Repayment.getOneRepayment(req.params.loanId);
      return res.status(200)
        .json({
          status: 200,
          data: {
            loanId: repayOne.loan_id,
            createdOn: repayOne.created_on,
            monthlyInstallment: repayOne.monthly_installment,
            amount: repayOne.amount,
            balance: repayOne.balance
          }
        });
    } catch (error){
      const repaymentVerification = await Repayment.getOneLoan(req.params.loanId);
      if (!repaymentVerification) {
        return res.status(404)
          .json({ status: 404, error: 'repayment not found' });
      }
      return res.status(400).json(error);
    }
  }
}

export default new RepaymentController();
