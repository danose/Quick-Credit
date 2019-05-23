import Encrypt from '../lib/hashPassword';
import db from '../db';

class Users {
  /**
     * User signup
     * @param {object} data
     * @returns {object} user object
     */
  
  async createUser(data) {
    const hashedPassword = Encrypt.hashPassword(data.password);
    const createQuery = `INSERT INTO users (first_name, last_name, password, address, email, status, phone, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
    const status = 'unverified';
    const newUser = [
      data.firstName,
      data.lastName,
      hashedPassword,
      data.address,
      data.email,
      status,
      data.phone,
      data.isAdmin
    ];
    const { rows } = await db.query(createQuery, newUser);
    return rows[0];
  }

  /**
     * Comparing user's email
     * @param {object} data
     * @returns {object} object
     */
  async getOne(data) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [data]);
    return rows[0];
  }

  /**
     * verifying a user
     * @param {string} email
     * @param {object} data
     * @returns {object} object
     */
  async verifyUser(email, data) {
    const verifyQuery = 'UPDATE users SET status = $1 WHERE email = $2 returning *';
    const values = [data.status, email];
    const { rows } = await db.query(verifyQuery, values);

    return rows[0];
  }
}


export default new Users();
