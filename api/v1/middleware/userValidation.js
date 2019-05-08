/* eslint-disable no-useless-escape */

/* eslint-disable no-useless-escape */

   
const nameLength = (nameString) => {

  if (nameString.length < 2) {

    return true;

  }
  return false;

};
const passwordLength = (nameString) => {

  if (nameString.length < 6) {

    return true;

  }
  return false;

};
const passwordLengthMax = (nameString) => {

  if (nameString.length > 30) {

    return true;

  }
  return false;

};

const nameLengthMax = (nameString) => {

  if (nameString.length > 30) {

    return true;

  }
  return false;

};
  
// const passwordLength = (passwordString) => {
  
 
const nameFormat = name => name.match(/^[a-zA-Z]+$/);
  
const emailFormat = email => email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
const passwordFormat = password => password.match(/^[a-zA-Z0-9]+$/);
  
const addressLength = (address) => {
  
  if (address.length < 3){
  
    return false;
  
  }
  return true;
  
};
  
const addressFormat = address => address.match(/^[\w\-\s]+$/);
  
  
export const validateSignup = (req, res, next) => {

  const error = {};
  
  const {
    firstName, lastName, password, email, address
  } = req.body;
      
  if (!firstName) {
  
    error.firstName = 'first name is required';
  
  }
  
  if (firstName && nameLength(firstName)) {
  
    error.firstName = 'first name should be between 2 to 30 characters';
  
  }
  if (firstName && nameLengthMax(firstName)) {
  
    error.firstName = 'first name should be between 2 to 30 characters';
  
  }

  if (firstName && !nameFormat(firstName)) {
  
    error.firstname = 'first name should be letters';
        
  }
  if (!lastName) {
  
    error.lastName = 'last name is required';
    
  }
  
  if (lastName && nameLength(lastName)) {
    
    error.lastName = 'last name should be between 2 to 30 characters';
    
  }
  if (lastName && nameLengthMax(lastName)) {
  
    error.lastName = 'last name should be between 2 to 30 characters';
  
  }

  if (lastName && !nameFormat(lastName)) {
    
    error.lastname = 'last name should be letters';
          
  }
  if (!email) {
  
    error.email = 'email is required';
      
  }
  
  if (email && !emailFormat(email)) {
      
    error.email = 'Email address is invalid';
      
  }
  if (!address) {
  
    error.address = 'address is required';
      
  }
  
  if (address && !addressLength(address)) {
      
    error.address = 'address should be not be less than 3 characters';
      
  }
  if (address && !addressFormat(address)) {
      
    error.address = 'address should contain letters and numbers';
            
  }
  if (!password) {
  
    error.password = 'password is required';
        
  }
  
  if (password && passwordLength(password)) {
        
    error.password = 'password should be between 6 to 30 characters';
        
  }
  if (password && passwordLengthMax(password)) {
        
    error.password = 'password should be between 6 to 30 characters';
        
  }

  if (password && !passwordFormat(password)) {
        
    error.password = 'password should contain at least uppercase, lowercase and numbers';
              
  }
  if (Object.keys(error).length === 0 && error.constructor === Object) {
  
    return next();
  
  }
  
  return res.status(400).json({
    status: 400,
    error
  
  
  });
  
  
};
  
export const validateSignIn = (req, res, next) => {

  const error = {};
  const {
    firstName, lastName, password, email, address
  } = req.body;
        
  if (!firstName) {
    
    error.firstName = 'first name is required';
    
  }
  
  if (!lastName) {
  
    error.lastName = 'last name is required';
      
  }
  
  if (!email) {
  
    error.email = 'email is required';
        
  }
  
  if (!address) {
  
    error.address = 'address is required';
        
  }
  
  if (!password) {
  
    error.password = 'password is required';
          
  }
  
  if (Object.keys(error).length === 0 && error.constructor === Object) {
  
    return next();
    
  }
    
  return res.status(400).json({
    status: 400,
    error
    
    
  });
  
};
