/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable padded-blocks */
import UserModel from '../models/users';
import Encrypt from '../lib/hashPassword';
import createToken from '../lib/createToken';

class UserController {
  /**
     * User signup controller
     * @param {string} req
     * @param {Array} res
     * @returns {object} user json object
     * @returns {object} error object
     */
  static async signUpUsers(req, res) {
    try {
      const user = await UserModel.createUser(req.body);
      const token = createToken(user.id, user.is_admin);
      return res.status(201)
        .header('x-auth-access', token)
        .json({
          status: 201,
          data: {
            token,
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone
          }
        });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ status: 400,
          error: 'user with that EMAIL or phone number already exists'
        });
      }
      return res.status(400).json(error);
    }
  }
  // Sign in users

  static signInUsers(req, res) {
    const matchedUser = UserModel.getOne(req.body);
    
    if (!matchedUser) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email or password'

      });
    }
    if (!Encrypt.comparePassword(matchedUser.password, req.body.password)) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email or password'
      });
    }
    const token = createToken(matchedUser.id, matchedUser.isAdmin);
    return res.status(200)
      .header('x-auth-access', token)
      .json({
        status: 200,
        data: {
          token,
          id: matchedUser.id,
          firstName: matchedUser.firstName,
          lastName: matchedUser.lastName,
          email: matchedUser.email
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
