import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

const createToken = (id) => {

  const token = jwt.sign({ userId: id }, secret, { expiresIn: '7d' });
  return token;
  
};

export default createToken;
