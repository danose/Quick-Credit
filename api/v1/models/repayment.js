import LoanModel from './loans';


class Repayment {

  constructor() {

    this.repayments = [];

  }

  create(data, param) {

    const loan = LoanModel.getOne(parseInt(param.loanId, 10));
    
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const newRepayment = {
      id: this.repayments.length + 1,
      loanId: loan.id,
      amount: loan.amount,
      monthlyInstallment: loan.paymentInstallment,
      paidAmount: parseFloat(data.paidAmount),
      createdOn: date.toISOString()
    };

    newRepayment.balance = parseFloat(((newRepayment.amount + loan.interest) - parseFloat(newRepayment.paidAmount)).toFixed(2));
    loan.balance = newRepayment.balance;
    loan.createdOn = newRepayment.createdOn;
    
    if (loan.balance === 0) {

      loan.repaid = true;

    }
    if (loan.balance > 0) {

      loan.repaid = false;

    }

    this.repayments.push(newRepayment);

    return newRepayment;

  }

  getOne(id) {

    return this.repayments.find(repay => repay.loanId === id);

  }

}

export default new Repayment();
