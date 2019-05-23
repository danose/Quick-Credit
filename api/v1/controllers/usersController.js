/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable padded-blocks */
import UserModel from '../models/users';
import Encrypt from '../lib/hashPassword';
import createToken from '../lib/createToken';

class UserController {
  /**
     * User signup controller
     * @param {object} req
     * @param {object} res
     * @returns {object} user json object
     * @returns {object} error object
     */
  static async signUpUsers(req, res) {
    try {
      const user = await UserModel.createUser(req.body);
      const token = UserController.token(user);
      return res.status(201)
        .header('x-auth-access', token)
        .json({ status: 201,
          data: {
            token,
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          }
          
        });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409,
          error: 'user with that EMAIL or phone number already exists'
        });
      }
      return res.status(400).json(error);
      
    }
  }

  static token(param){
    const userInfo = {
      firstName: param.first_name,
      email: param.email,
      lastName: param.last_name,
      address: param.address,
      phone: param.phone,
      password: param.password,
      status: param.status };
    
    const token = createToken(param.id, param.is_admin, userInfo);
    return token;
  }
  
  
  /**
     * User signin
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

  static async signInUsers(req, res) {
    const matchedUser = await UserModel.getOneUser(req.body.email);
    if (!matchedUser) {
      return res.status(400).json({ status: 400, error: 'invalid email or password'
      });
    }
    if (!Encrypt.comparePassword(matchedUser.password, req.body.password)) {
      return res.status(400).json({ status: 400, error: 'invalid email or password'
      });
    }
    const token = UserController.token(matchedUser);
    return res.status(200)
      .json({
        status: 200,
        data: {
          token,
          id: matchedUser.id,
          firstName: matchedUser.first_name,
          lastName: matchedUser.last_name,
          email: matchedUser.email
        }
      });
  }
  
  /**
     * User verification
     * @param {object} req
     * @param {object} res
     * @returns {object} verified user json object
     * @returns {object} error object
     */
  static async verifyUser(req, res) {
    try {
      const verified = await UserModel.verifyUser(req.params.userEmail, req.body);
     
      return res.status(200)
        .json({
          status: 200,
          data: {
            email: verified.email,
            firstName: verified.first_name,
            lastName: verified.last_name,
            password: verified.password,
            address: verified.address,
            status: verified.status
          }
        });
    } catch (error) {
      const match = await UserModel.getOneUser(req.params.userEmail);
      if (!match) {
        return res.status(404).json({ status: 404, error: 'User does not exist' });
      }
      return res.status(400).json(error);
    }
  }
  
}

export default UserController;
