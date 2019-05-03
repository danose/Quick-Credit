import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {

  const token = req.header('x-auth-access');
  if (!token) {
        
    res.status(401)
      .json({
        status: 401,
        error: 'Access denied. No token provided'
      });

  }
  try {

    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.userId,
      isAdmin: decoded.isAdmin
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
