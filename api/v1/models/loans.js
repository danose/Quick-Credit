import db from '../db';

class Loans {
  /**
     * create loan
     * @param {object} data
     * @param {object} user
     * @returns {object} response object
     */
  async createLoan(data, user) {
    const createQuery = 'INSERT INTO loans (status, tenor, amount, email, repaid, balance, created_on, payment_installment, interest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    
    const interest = 0.05 * Number.parseFloat(data.amount);
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    // eslint-disable-next-line radix
    const paymentInstallment = (Number.parseFloat(data.amount) + Number.parseFloat(interest)) / Number.parseInt(data.tenor, 10);
    const balance = Number.parseFloat(data.amount) + Number.parseFloat(interest);
    const newLoan = [
      'pending',
      Number.parseInt(data.tenor, 10),
      Number.parseFloat(data.amount),
      user.email,
      false,
      balance,
      date.toISOString(),
      paymentInstallment,
      interest
    ];
    const { rows } = await db.query(createQuery, newLoan);
    return rows[0];
  }

  /**
     * Get all loans
     * @returns {array} response array
     */
  async getAllLoans() {
    const getAll = 'SELECT * FROM loans';
    const { rows } = await db.query(getAll);
    return rows;
  }

  /**
     * Get loans
     * @returns {array} response array
     */
  async getAllStatus(stat){
    const unpaidRepaid = 'SELECT * FROM loans WHERE status= $1 AND repaid= $2';
    const { rows } = await db.query(unpaidRepaid, ['approved', stat]);
    return rows;
  }

  /**
     * Get one loan
     * @param {string} id
     * @returns {array} response object
     */
  async getOneLoan(id) {
    const text = 'SELECT * FROM loans WHERE id =$1';
    const { rows } = await db.query(text, [id]);
    return rows[0];
  }

  /**
     * Get loan status
     * @param {string} user
     * @returns {object} response object
     */
  async getRepaidStatus(user) {
    const text = 'SELECT * FROM loans WHERE email= $1 AND repaid= $2';
    const { rows } = await db.query(text, [user.email, false]);
    return rows[0];
  }
  
  /**
     * Approve/reject loans
     * @param {string} id
     * @param {object} data
     * @returns {object} response object
     */
  async approveLoan(id, data) {
    const approveLoan = 'UPDATE loans SET status= $1 WHERE id= $2 returning *';
    const values = [data.status, id];
    const { rows } = await db.query(approveLoan, values);
    
    return rows[0];
  }
}


export default new Loans();
