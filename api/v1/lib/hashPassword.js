import bcrypt from 'bcrypt';

class Encrypt {
  /**
     * Hash Password
     * @param {string} password
     * @returns {string} hashed password
     */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  /**
     * Compare password
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} True or False
     */

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default Encrypt;
