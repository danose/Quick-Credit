import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
     * Authenticate a user
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
const secret = process.env.SECRET;

const auth = (req, res, next) => {
  const token = req.header('x-auth-access');
  if (!token) {
    res.status(401).json({ status: 401, error: 'Access denied. No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.userId,
      isAdmin: decoded.isAdmin,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      password: decoded.password,
      address: decoded.address,
      phone: decoded.phone
    };
    next();
  } catch (ex) {
    res.status(400)
      .json({
        status: 400,
        error: 'Invalid token'
      });
  }
};
export default auth;
