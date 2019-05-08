/* eslint-disable import/prefer-default-export */

// Validating the repayments
export const validateRepayment = (req, res, next) => {

  const { paidAmount } = req.body;

  let error;

  if (!paidAmount) {

    error = 'payment is required';

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
