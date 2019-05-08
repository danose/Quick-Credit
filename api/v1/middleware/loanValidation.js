/* eslint-disable import/prefer-default-export */

// Validating the loan application
export const validateLoan = (req, res, next) => {

  const { tenor, amount } = req.body;

  let error;

  if (!tenor) {

    error = 'tenor is required';

  }

  if (tenor && parseInt(tenor, 10) < 1) {

    error = 'tenor should be between 1 and 12';

  }

  if (tenor && !tenor.match(/^[0-9]+$/)) {

    error = 'tenor must be a number';

  }

  if (tenor && parseInt(tenor, 10) > 12) {

    error = 'tenor should be between 1 and 12';

  }

  if (!amount) {

    error = 'loan amount is required';

  }
  if (amount && !amount.match(/^[0-9]+$/)) {

    error = 'amount must be a number';

  }

  if (amount && parseFloat(amount) < 10000) {

    error = 'loan amount should be between 10000 to 200000';

  }

  if (amount && parseFloat(amount) > 200000) {

    error = 'loan amount should be between 10000 to 200000';
    
  }

  if (!error) {

    return next();

  }

  return res.status(400)
    .json({
      status: 400,
      error
    });

 
};
