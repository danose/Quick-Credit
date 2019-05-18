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
     * Comparing user email
     * @param {object} data
     * @returns {object} object
     */
  async getOne(data) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [data]);
    return rows[0];
  }


  // Verifying a user from the users array
}


export default new Users();
