import Encrypt from '../lib/hashPassword';


class Users {

  constructor() {

    this.users = [];

  }
  

  createUser(data) {

    const hashedPassword = Encrypt.hashPassword(data.password);
    const newUser = {

      id: this.users.length + 1,
      
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
      address: data.address,
      email: data.email,
      status: 'unverified',
      isAdmin: data.isAdmin

    };
    this.users.push(newUser);
    

    return newUser;

  }

  getOne(data) {

    return this.users.find(user => user.email === data.email.toLowerCase());

  }

  verifyOne(email) {

    
    return this.users.filter(user => user.email === email)[0];
    
    
  }

  verifyUser(id, data) {

    const user = this.verifyOne(id);
    const index = this.users.indexOf(user);
    
    this.users[index].status = data.status;

    return this.users[index];


  }

  
}

export default new Users();
