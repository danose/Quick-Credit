import UserModel from '../models/users';
import Encrypt from '../lib/hashPassword';
import createToken from '../lib/createToken';

class UserController {

  static signUpUsers(req, res) {

    const matchedUser = UserModel.getOne(req.body);
    if (matchedUser) {

      return res.status(400).json({
        status: 400,
        error: 'user with that EMAIL already exists'

      });

    }
    const user = UserModel.createUser(req.body);
    const token = createToken(user.id);

    return res.status(201)
      .header('x-auth-access', token)
      .json({
        status: 201,
        data: {
          token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          status: user.status,
          isAdmin: user.isAdmin
        }

      });

  }

  static signInUsers(req, res) {

    const matchedUser = UserModel.getOne(req.body);
    const token = createToken(matchedUser.id);
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
        verified
      });

  }


}

export default UserController;
