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
    const createQuery = `INSERT INTO users (first_name, last_name, password, address, email, status, phone) VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
    const status = 'unverified';
    const newUser = [
      data.firstName,
      data.lastName,
      hashedPassword,
      data.address,
      data.email,
      status,
      data.phone
    ];
    const { rows } = await db.query(createQuery, newUser);
    return rows[0];
  }




  // Verifying a user from the users array
  verifyOne(email) {
    return this.users.filter(user => user.email === email)[0];
  }

  verifyUser(id, data) {
    const user = this.verifyOne(id);
    const index = this.users.indexOf(user);
    
    this.users[index].status = data.status;

    return this.users[index];
  }
}


export default new Users();
