import bcrypt from 'bcrypt';

class Encrypt {

  static hashPassword(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  }

  static comparePassword(hashPassword, password) {

    return bcrypt.compareSync(password, hashPassword);

  }

}

export default Encrypt;
