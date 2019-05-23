import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../../server';


dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);

const loanUrl = '/api/v1/loans';


const token = process.env.TOKEN1;
const adminToken = process.env.TOKEN;

// Testing loans and repayments
describe('Loans', () => {
  // Setting up the admin
  

  // Testing loan application
  describe('Create loan', () => {
    it('should create a loan with adequate info', () => {
      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
         
          tenor: '2',
          amount: '20000',
          createdOn: '2018-05-04 00:00:00 +00',
          email: 'bolaa@gmail.com',
          repaid: 'false',
          status: 'pending',
          paymentInstallment: '1213',
          balance: '243255',
          interest: '2442'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
        });
    });
    
    it('should not create a loan for user who has not repaid', () => {
      chai.request(app).post(loanUrl)
        .set('x-auth-access', token)
        
        .send({
          tenor: '2',
          amount: '20000',
          createdOn: '2018-05-04 00:00:00 +00',
          email: 'bolaa@gmail.com',
          repaid: 'false',
          status: 'pending',
          paymentInstallment: '1213',
          balance: '243255',
          interest: '2442'
          
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res).to.have.status(400);
          expect(res.body.error).to.include('you must repay before applying');
        });
    });
    it('should not create a loan for an admin', () => {
      chai.request(app).post(loanUrl)
        .set('x-auth-access', adminToken)
        
        .send({
          id: 1,
          tenor: '2',
          amount: '20000'
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.error).to.include('Access Denied');
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
  });
});
