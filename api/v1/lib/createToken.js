import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const secret = process.env.SECRET;
/**
     * Generate Token
     * @param {integer} id
     * @param {boolean} admin
     * @param {object} userInfo
     * @returns {string} token
     */

const createToken = (id, admin, userInfo) => {
  if (userInfo) {
    const token = jwt.sign({
      firstName: userInfo.firstName, email: userInfo.email, lastName: userInfo.lastName, phone: userInfo.phone, address: userInfo.address
    }, secret, { expiresIn: '100d' });
    return token;
  }
  const token = jwt.sign({ userId: id, isAdmin: admin }, secret, { expiresIn: '100d' });
  return token;
};

export default createToken;
