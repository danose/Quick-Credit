/* eslint-disable no-trailing-spaces */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
 

const { expect } = chai;
chai.use(chaiHttp);


const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';

const users = {
    
  firstName: 'Daniel',
  lastName: 'Etiobhio',
  email: 'etiobhiodaniel@gmail.com',
  password: 'DeJjaisjiasj111',
  address: '1 lagos'
    
};

  
describe('Users', () => {

  // Test User Sign Up
  describe('User Sign Up', () => {

    it('should create user with correct requirements', () => {
  
      chai.request(app).post(signUpUrl)
        .send(users)
        .end((err, res) => {
  
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res).to.have.header('x-auth-access');
          expect(res.body.data.firstName).to.be.a('string');
          
          expect(res.body.data).to.have.property('token');
         
          expect(res.body.data.lastName).to.be.a('string');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data.address).to.be.a('string');
         
        
        });
  
    });
    it('should not create user with wrong email format', () => {

      chai.request(app).post(signUpUrl)
        .send(
          {
            firstName: 'Daniel',
            lastName: 'Etiobhio',
            email: 'etioel.com',
            password: 'dejjaisjiasj111',
            address: 'lagos'
              
          }
        )
        .end((err, res) => {

          expect(res).to.have.status(400);
          
          
          expect(res.body.error.email).to.include('Email address is invalid');

        });
      
    });
    it('should not create a user with empty email', () => {

      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Daniel',
          lastName: 'Etiobhio',
          email: '',
          password: 'dejjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.email).to.include('email is required');

        });

    });
    it('should not create a user with an email which already exists', () => {
    
      chai.request(app).post(signUpUrl)
        .send(users)
        .end((err, res) => { 

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
          expect(res.body.error).to.include('user with that EMAIL already exists');
  
        });
  
    });
    it('should not create a user without a firstName', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: '',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.firstName).to.include('first name is required');
    
        });
    
    });
    
    
    it('should not create a user without a lastName', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: '',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
    
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
        
          expect(res.body.error.lastName).to.include('last name is required');
      
        });
      
    });
    
    
    it('should not create a user with lastName containing a number', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'radius',
          lastName: '6',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
        
        });
            
    });
    it('should not create a user without an address', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: ''
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.address).to.include('address is required');
        
        });
        
    });
    it('should not create a user with address less than 2 characters', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'E',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'l'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.address).to.include('address should be not be less than 3 characters');
          
        });
          
    });
    it('should not create a user without a password', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: '',
          address: 'lagos'
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
          expect(res.body.error.password).to.include('password is required');
        
        });
        
    });
    
    
    it('should not create a user with password not alphanumeric', () => {
        
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: '$#',
          address: 'lagos'
        })
        .end((err, res) => { 
            
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
          
              
        });
              
    });

              
  });

  // Test User Sign in
  describe('User sign in', () => {

    it('should sign in with correct requirements', () => {
  
      chai.request(app).post(signInUrl)
        .send(users)
        .end((err, res) => {
    
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res).to.have.header('x-auth-access');
          expect(res.body.data).to.have.property('token');
          
    
        });
    
    });
    
    it('should not sign in a user with empty email', () => {
  
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Daniel',
          lastName: 'Etiobhio',
          email: '',
          password: 'dejjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => {
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
          expect(res.body.error.email).to.include('email is required');
  
        });
  
    });
    
    
    it('should not signin a user without a firstName', () => {
      
      chai.request(app).post(signInUrl)
        .send({
          firstName: '',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111'
          
        })
        .end((err, res) => { 
    
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.firstName).to.include('first name is required');
      
        });
      
    });
    
    it('should not sigin a user without a lastName', () => {
      
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Dami',
          lastName: '',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
        
          expect(res.body.error.lastName).to.include('last name is required');
        
        });
        
    });
    
    it('should not sign in a user without a password', () => {
    
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: ''
            
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.password).to.include('password is required');
          
        });
          
    });
    it('should not sign in a user with incorrect password', () => {
          
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Daniel',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'De1'
           
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
          expect(res.body.error.password).to.include('invalid email or password');
            
        });
            
    });
     
    
  });
  
  // Test Verify User
  describe('Verify Users', () => {

    it('should verify a user with correct email', () => {

      chai.request(app).patch('/api/v1/users/etiobhiodaniel@gmail.com/verify')
        .send({
          status: 'verified'
        })
        .end((err, res) => {

          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
         
        });

    });
    it('should not verify a user with incorrect email', () => {

      chai.request(app).patch('/api/v1/users/etidaniel@gmail.com/verify')
        .send({
          status: 'verified'
        })
        .end((err, res) => {
  
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('User email does not exist');
  
        });
  
    });

  });

});
