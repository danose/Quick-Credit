/* eslint-disable no-trailing-spaces */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
 

const { expect } = chai;
chai.use(chaiHttp);


const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';

const users = [
  {
    firstName: 'Daniel',
    lastName: 'Etiobhio',
    email: 'etiobhiodaniel@gmail.com',
    password: 'DeJjaisjiasj111',
    address: 'lagos'
  },

  {
    firstName: 'Daniel',
    lastName: 'Etiobhio',
    email: 'etiobhiodaniel@gmail.com',
    password: 'dejjaisjiasj111',
    address: 'lagos',
    admin: true  
  }

];

describe('Users', () => {

  // Test User Sign Up
  describe('User Sign Up', () => {

    it('should create user with correct requirements', () => {
  
      chai.request(app).post(signUpUrl)
        .send(users[0])
        .end((err, res) => {
  
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res).to.have.header('x-auth-access');
          expect(res.body.data.firstName).to.be.a('string');
          expect(res.body.status).to.include(201);
          expect(res.body.data.firstName).to.equal(users[0].firstName);
          expect(res.body.data.lastName).to.equal(users[0].lastName);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.email).to.equal(users[0].email);
          expect(res.body.data.lastName).to.be.a('string');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data.address).to.be.a('string');
          expect(res.body.data.address).to.equal(users[0].address);
          
       
        });
  
    });
    it('should not create user with wrong email format', () => {

      chai.request(app).post(signUpUrl)
        .send(
          {
            firstName: 'Daniel',
            lastName: 'Etiobhio',
            email: 'etiobhiodaniel.com',
            password: 'dejjaisjiasj111',
            address: 'lagos'
              
          }
        )
        .end((err, res) => {

          expect(res).to.have.status(400);
          expect(res.body.status).to.include(400);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.include('Email address is invalid');

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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('email is required');

        });

    });
    it('should not create a user with an email which already exists', () => {
    
      chai.request(app).post(signUpUrl)
        .send(users[0])
        .end((err, res) => { 

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('first name is required');
    
        });
    
    });
    it('should not create a user with firstName less than 2 characters', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'a',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
    
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('first name should be between 2 to 30 characters');
      
        });
      
    });
    it('should not create a user with firstName more than 30 characters', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'azkdfjfklkflklklklfklsklklklklkslklskslkslklkllk',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('first name should be between 2 to 30 characters');
        
        });
        
    });
    it('should not create a user with firstName containing a number', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: '5radius',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('first name should be letters');
          
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name is required');
      
        });
      
    });
    it('should not create a user with lastName less than 2 characters', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'E',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name should be between 2 to 30 characters');
        
        });
        
    });
    it('should not create a user with lastName more than 30 characters', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'azkdfjfklkflklklklfklsklklklklkslklskslkslklkllk',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name should be between 2 to 30 characters');
          
        });
          
    });
    it('should not create a user with lastName containing a number', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'radius',
          lastName: '6Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name should be letters');
            
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('address is required');
        
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name should be between 2 to 30 characters');
          
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password is required');
        
        });
        
    });
    it('should not create a user with password less than 3 characters', () => {
        
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'De1',
          address: 'lagos'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password should be between 3 to 30 characters');
          
        });
          
    });
    it('should not create a user with password more than 30 characters', () => {
        
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'azkdfjfklkflklklklfklsklklklklkslklskslkslklkllk1DDD',
          address: 'lagos'
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password should be between 3 to 30 characters');
            
        });
            
    });
    it('should not create a user with password not alphanumeric', () => {
        
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'azkdfjfklkflklklklfklsklklklklkslklskslkslklkllk1DDD',
          address: 'lagos'
        })
        .end((err, res) => { 
            
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password should contain at least uppercase, lowercase and numbers');
              
        });
              
    });

              
  });

  // Test User Sign in
  describe('User sign in', () => {

    it('should sign in with correct requirements', () => {
  
      chai.request(app).post(signInUrl)
        .send(users[0])
        .end((err, res) => {
    
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res).to.have.header('x-auth-access');
          expect(res.body.data.firstName).to.be.a('string');
          expect(res.body.status).to.include(200);
          expect(res.body.data.firstName).to.equal(users[0].firstName);
          expect(res.body.data.lastName).to.equal(users[0].lastName);
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.email).to.equal(users[0].email);
          expect(res.body.data.lastName).to.be.a('string');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data.address).to.be.a('string');
          expect(res.body.data.address).to.equal(users[0].address);
            
         
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('email is required');
  
        });
  
    });
    it('should not sign in a user with incorrect email', () => {
  
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Daniel',
          lastName: 'Etiobhio',
          email: 'danny@gmail.com',
          password: 'dejjaisjiasj111'
            
        })
        .end((err, res) => {
    
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('email is required');
    
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('first name is required');
      
        });
      
    });
    it('should not sign in a user with incorrect firstName ', () => {
      
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'a',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
      
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('user does not exist');
        
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('last name is required');
        
        });
        
    });
    it('should not sign in a user with incorrect last name', () => {
        
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Daniel',
          lastName: 'E',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('user does not exist');
          
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
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password is required');
          
        });
          
    });
    it('should not sign in a user with incorrect password', () => {
          
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'De1'
           
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.include(400);
          expect(res.body.error).to.include('password incorrect');
            
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
          expect(res.body).to.have.property('status');

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
