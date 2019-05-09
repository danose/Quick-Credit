import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

const { expect } = chai;
chai.use(chaiHttp);

const loanUrl = '/api/v1/loans';


let token;
let adminToken;

// Testing loans and repayments
describe('Loans', () => {
  
  // Setting up the admin
  before(() => {

    chai.request(app).post('/api/v1/auth/signup')
      .send({
        
        firstName: 'ola',
        lastName: 'ann',
        email: 'bolaa@gmail.com',
        password: 'eJtttttssjs',
        address: '2 abuja',
        isAdmin: true
        
          
      })
      .end((err, res) => {

        if (err) throw err;

        adminToken = res.body.data.token;
        

      });

  });

  // setting up the user
  before(() => {

    chai.request(app).post('/api/v1/auth/signup')
      .send({
        
        firstName: 'Dani',
        lastName: 'bhio',
        email: 'etidaniel@gmail.com',
        password: 'eJjjiasj111',
        address: '1 lagos'
        
          
      })
      .end((err, res) => {

        if (err) throw err;

        token = res.body.data.token;
        

      });

  });

  // Testing loan application
  describe('Create loan', () => {

    it('should create a loan with adequate info', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '2',
          amount: '20000'
        })
        .end((err, res) => {

          
          expect(res.body).to.be.an('object');

        });

    });
    it('should not create a loan for user who has applied', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '2',
          amount: '20000'
        })
        .end((err, res) => {

          
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(400);
          expect(res.body.error).to.include('you can only apply ONE at a time');

        });

    });
    it('should not create a loan with wrong token', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', 'shjsfhs')
        
        .send({
          id: 1,
          tenor: '3',
          amount: '20000.00'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('Invalid token');

        });

    });
    it('should not create a loan without a token', () => {

      chai.request(app).post(loanUrl)
        
        
        .send({
          id: 1,
          tenor: '3',
          amount: '20000.00'
        })
        .end((err, res) => {

          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('Access denied. No token provided');

        });

    });
    it('should not create a loan with empty tenor', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '',
          amount: '20000'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('tenor is required');

        });

    });
    it('should not create a loan with tenor less than 1', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '0',
          amount: '20000'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('tenor should be between 1 and 12');

        });

    });
    it('should not create a loan with tenor more than 12', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '14',
          amount: '20000'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('tenor should be between 1 and 12');

        });

    });
    it('should not create a loan with tenor not a number', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: 'abc',
          amount: '20000'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('tenor must be a number');

        });

    });
    it('should not create a loan without amount', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '4',
          amount: ''
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('loan amount is required');

        });

    });
    it('should not create a loan amount less than 10000', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '1',
          amount: '500'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('loan amount should be between 10000 to 200000');

        });

    });
    it('should not create a loan amount more than 200000', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '1',
          amount: '500000'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('loan amount should be between 10000 to 200000');

        });

    });
    it('should not create a loan with amount not a number ', () => {

      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '4',
          amount: 'abc'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('amount must be a number');

        });

    });


  });

  // Testing getting a loan

  describe('Get a loan', () => {

    it('should not get a loan with wrong token', () => {

      chai.request(app).get('/api/v1/loans/1')
        .set('x-auth-access', token)
        
        .send({
          id: 1,
          tenor: '3',
          amount: '20000'
        })
        .end((err, res) => {

          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('Access Denied');

        });

    });
    it('should get a loan with correct id', () => {

      chai.request(app).get('/api/v1/loans/1')
        .set('x-auth-access', adminToken)
        
        
        .end((err, res) => {

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          
        });

    });
    it('should not get a loan with incorrect id', () => {

      chai.request(app).get('/api/v1/loans/34')
        .set('x-auth-access', adminToken)
        
        
        .end((err, res) => {

          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('loan not found');
          
        });

    });


  });

  // Testing repayment history creation
  describe('post repayment', () => {

    it('should create a repayment', () => {

      chai.request(app).post('/api/v1/loans/1/repayment')
        .set('x-auth-access', adminToken)
        
        .send({
          id: 1,
          paidAmount: '200'
        })
        .end((err, res) => {

          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');

        });

    });

    
    it('should not create a repayment with wrong id', () => {

      chai.request(app).post('/api/v1/loans/5/repayment')
        .set('x-auth-access', adminToken)
        
        .send({
          id: 1,
          paidAmount: '200'
        })
        .end((err, res) => {

          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');

        });

    });
    it('should not create a repayment with empty repayment', () => {

      chai.request(app).post('/api/v1/loans/1/repayment')
        .set('x-auth-access', adminToken)
          
        .send({
          id: 1,
          paidAmount: ''
        })
        .end((err, res) => {
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('payment is required');
  
        });
  
    });
    it('should not create a repayment when repayment is greater than amount + interest', () => {

      chai.request(app).post('/api/v1/loans/1/repayment')
        .set('x-auth-access', adminToken)
              
        .send({
          id: 1,
          paidAmount: '57645555555555'
        })
        .end((err, res) => {
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('paid amount cannot exceed loan + interest');
      
        });
      
    });


  });

  // Testing getting all loans, repaid loans and unpaid loans
  describe('Loan all loans', () => {

    it('should get all loans', () => {

      chai.request(app).get('/api/v1/loans')
        .set('x-auth-access', adminToken)
        .end((err, res) => {

          expect(res).to.have.status(200);
          

        });

    });
    it('should get all repaid loans', () => {

      chai.request(app).get('/api/v1/loans?status=approved&repaid=true')
        .set('x-auth-access', adminToken)
        .end((err, res) => {

          expect(res).to.have.status(200);
          
        });

    });
    it('should get all unpaid laons', () => {

      chai.request(app).get('/api/v1/loans?status=approved&repaid=false')
        .set('x-auth-access', adminToken)
        .end((err, res) => {

          expect(res).to.have.status(200);
         
        });

    });


  });

  // Test for approving or rejecting loan applications
  describe('approve/reject loans', () => {

    
    it('should approve/reject loan with correct id', () => {

      chai.request(app).patch('/api/v1/loans/1')

        .set('x-auth-access', adminToken)
        
        .send({
          status: 'approved'
        })
        
        .end((err, res) => {

          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
         
        });

    });
    it('should not approve/reject a loan with incorrect id', () => {

      chai.request(app).patch('/api/v1/loans/4')
        .set('x-auth-access', adminToken)
        .send({
          status: 'approved'
        })
        .end((err, res) => {

          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          

        });
             
  
    });

  });

  // Test for getting repayment history
  describe('get repayments', () => {

    it('should get a repayment history', () => {

      chai.request(app).get('/api/v1/loans/1/repayments')
        .set('x-auth-access', token)
        .end((err, res) => {

         
          expect(res.body).to.be.an('object');

        });

    });
    it('should not get a repayment history with wrong id', () => {

      chai.request(app).get('/api/v1/loans/5/repayments')
        .set('x-auth-access', token)
        .end((err, res) => {

          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('repayment not found');

        });

    });

  });


});
