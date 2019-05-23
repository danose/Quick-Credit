/* eslint-disable consistent-return */
import db from '../db';


class Repayment {
  /**
     * create repayment
     * @param {object} data
     * @param {string} param
     * @returns {object} response object
     */
  static async createRepayment(data, param) {
    const loan = await this.getOneLoan(param);
    const repayQuery = 'INSERT INTO repayments (loan_id, amount, monthly_installment, paid_amount, created_on, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    
    const newRepayment = [
      loan.id,
      loan.amount,
      loan.payment_installment,
      Number.parseFloat(data.paidAmount),
      date.toISOString(),
      loan.balance
    ];
    
    const { rows } = await db.query(repayQuery, newRepayment);
    return rows[0];
  }

  /**
     * Update loan
     * @param {object} data
     * @param {string} param
     * @returns {object} response object
     */
  static async updateLoan(param, data){
    const loan = await this.getOneLoan(param);
    const loanBalance = loan.balance;
    
    if (Number.parseFloat(loanBalance) >= Number.parseFloat(data.paidAmount)){
      const balance = Number.parseFloat(loanBalance) - Number.parseFloat(data.paidAmount);
      const updateLoan = 'UPDATE loans SET balance= $1 WHERE id= $2 returning *';
      const { rows } = await db.query(updateLoan, [balance, param]);
      if (Number.parseFloat(rows[0].balance) === 0.00){
        const repaid = true;
        const repaidStatus = 'UPDATE loans SET repaid= $1 WHERE id=$2;';
        await db.query(repaidStatus, [repaid, param]);
      }
    }
  }
  
  /**
     * Get one loan
     * @param {string} param
     * @returns {object} response object
     */
  static async getOneLoan(param){
    const text = 'SELECT * FROM loans WHERE id= $1';
    const { rows } = await db.query(text, [param]);
    return rows[0];
  }

  /**
     * Get one repayment
     * @param {string} id
     * @returns {object} response object
     */
  static async getOneRepayment(id){
    const text = 'SELECT * FROM repayments WHERE loan_id= $1';
    const { rows } = await db.query(text, [id]);
    const index = rows.length - 1;
    return rows[index];
  }
}

export default Repayment;
