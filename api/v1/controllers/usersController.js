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
      const userInfo = {
        firstName: user.first_name,
        email: user.email,
        lastName: user.last_name,
        address: user.address,
        phone: user.phone };
      const token = createToken(user.id, user.is_admin, userInfo);
      return res.status(201)
        .json({
          status: 201,
          message: 'success',
          token
        });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({ status: 409,
          message: 'user with that EMAIL or phone number already exists'
        });
      }
      return res.status(400).json(error);
    }
  }
  
  /**
     * User signin
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

  static async signInUsers(req, res) {
    const matchedUser = await UserModel.getOne(req.body);
    if (!matchedUser) {
      return res.status(400).json({ status: 400, error: 'invalid email or password'
      });
    }
    if (!Encrypt.comparePassword(matchedUser.password, req.body.password)) {
      return res.status(400).json({ status: 400, error: 'invalid email or password'
      });
    }
    const userStat = {
      firstName: matchedUser.first_name,
      email: matchedUser.email,
      lastName: matchedUser.last_name,
      address: matchedUser.address,
      phone: matchedUser.phone };
    const token = createToken(matchedUser.id, matchedUser.is_admin, userStat);
    return res.status(200)
      .json({
        status: 200,
        data: {
          token
        }
      });
  }
  
  // Verify Users

  static verifyUser(req, res) {
    const match = UserModel.verifyOne(req.params.userEmail);
   

    if (!match) {
      return res.status(400).json({
        status: 400,
        error: 'User email does not exist'
      });
    }
    const verified = UserModel.verifyUser(req.params.userEmail, req.body);
    
    
    return res.status(200)
      .json({
        status: 200,
        data: {
          id: verified.id,
          email: verified.email,
          firstName: verified.firstName,
          lastName: verified.lastName,
          password: verified.password,
          address: verified.address,
          status: verified.status

        }

      });
  }
}

export default UserController;
