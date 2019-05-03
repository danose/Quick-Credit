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
    it('should not create a user a firstName less than 2', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'e',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.firstName).to.include('first name should be between 2 to 30 characters');
    
        });
    
    });
    it('should not create a user a firstName greater than 30', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'edkjadkakaldklakdaldlaljdkjalkdladkdddndndndndnddjdd',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.firstName).to.include('first name should be between 2 to 30 characters');
    
        });
    
    });
    it('should not create a user with firstName containing a number', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: '56',
          lastName: 'shsdf',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
          
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
         
        
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
    it('should not create a user a lastName less than 2', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'dan',
          lastName: 'e',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.lastName).to.include('last name should be between 2 to 30 characters');
    
        });
    
    });
    it('should not create a user a lastName greater than 30', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'edkjadkak',
          lastName: 'Etiobhioajdkdjkajdnkladlakdakdkdnjbfhbfjkbakjljbdhbshj',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.lastName).to.include('last name should be between 2 to 30 characters');
    
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
    it('should not create a user with address less than 3 characters', () => {
      
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
    it('should not create a user with address not with numbers and letters', () => {
      
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Egjkh',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111',
          address: '$%&'
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.address).to.include('address should contain letters and numbers');
          
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
    it('should not create a user with password less than 6', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'dan',
          lastName: 'essffg',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJ',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.password).to.include('password should be between 6 to 30 characters');
    
        });
    
    });
    it('should not create a user with password greater than 30', () => {
    
      chai.request(app).post(signUpUrl)
        .send({
          firstName: 'edkjadkak',
          lastName: 'Etiobhioajdkd',
          email: 'etiobhiodaniel@gmail.com',
          password: 'DeJjaisjiasj111dlsdkllsklkdksdldlddlkdlklsdkdlskldskdlkddsldk',
          address: 'lagos'
        })
        .end((err, res) => { 
  
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body.error.password).to.include('password should be between 6 to 30 characters');
    
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
          expect(res.body.error.password).to.include('password should contain at least uppercase, lowercase and numbers');
    
     
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
    
      chai.request(app).post(signInUrl)
        .send({
          firstName: 'Dami',
          lastName: 'Etiobhio',
          email: 'etiobhiodaniel@gmail.com',
          password: 'ert'
            
        })
        .end((err, res) => { 
        
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          
          expect(res.body).to.have.property('error');
          
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
  
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
         
  
        });
  
    });

  });

});
