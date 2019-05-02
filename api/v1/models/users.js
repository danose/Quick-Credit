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
      status: data.status,
      isAdmin: false

    };
    this.users.push(newUser);
    

    return newUser;

  }

  getOne(data) {

    return this.users.find(user => user.email === data.email.toLowerCase());

  }

  verifyOne(email) {

    
    return this.users.find(user => user.email === email);
    
    
  }

  verifyUser(email, data) {

    const user = this.verifyOne(email);
    const index = this.users.indexOf(user);
    this.users[index].firstName = data.firstName;
    this.users[index].lastName = data.lastName;
    this.users[index].email = data.email;
    this.users[index].address = data.address;
    this.users[index].status = data.status;

    return this.users[index];


  }

  
}

export default new Users();
