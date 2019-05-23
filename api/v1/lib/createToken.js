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
  const token = jwt.sign({
    userId: id,
    isAdmin: admin,
    firstName: userInfo.firstName,
    email: userInfo.email,
    lastName: userInfo.lastName,
    phone: userInfo.phone,
    address: userInfo.address,
    password: userInfo.password,
    status: userInfo.status
  }, secret, { expiresIn: '100d' });
  return token;
};
  

export default createToken;
