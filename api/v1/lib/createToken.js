import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// Generating a JSON web token for authentication

const secret = process.env.SECRET;

const createToken = (id, admin) => {

  const token = jwt.sign({ userId: id, isAdmin: admin }, secret, { expiresIn: '100d' });
  return token;
  
};

export default createToken;
