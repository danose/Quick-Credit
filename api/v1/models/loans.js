
import UserModel from './users';

class Loans {

  constructor() {

    this.loans = [];

  }

  // loan application creation
  create(data, user) {

    
    const userOne = UserModel.getId(user.id);
    
    const newLoan = {

      id: this.loans.length + 1,
      status: 'pending',
      tenor: parseInt(data.tenor, 10),
      amount: parseFloat(data.amount),
      user: userOne.email,
      repaid: false
     
    };
    
    newLoan.interest = parseFloat((0.05 * newLoan.amount).toFixed(2));
    newLoan.paymentInstallment = parseFloat((newLoan.amount + parseFloat(newLoan.interest) / newLoan.tenor).toFixed(2));
    

    newLoan.balance = newLoan.amount + newLoan.interest;
    
          
    this.loans.push(newLoan);

    return newLoan;


  }

  getAll() {

    return this.loans;

  }

  getOne(id) {

    return this.loans.find(loan => loan.id === id);

  }

  getRepaidStatus() {

    return this.loans.filter(loan => loan.repaid === false)[0];

  }

  getUserEmail(email) {

    return this.loans.find(loan => loan.user === email);
    
  }

  
  approveLoan(id, data) {

    const loan = this.getOne(id);
    const index = this.loans.indexOf(loan);
    
    this.loans[index].status = data.status;

    return this.loans[index];

  }

}


export default new Loans();
