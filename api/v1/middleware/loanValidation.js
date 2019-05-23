/* eslint-disable import/prefer-default-export */

/**
     * Validate loans
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
export const validateLoan = (req, res, next) => {
  const { tenor, amount } = req.body;
  const error = {};
  if (!tenor) { error.tenor = 'tenor is required'; }
  if (tenor && parseInt(tenor, 10) < 1) { error.tenor = 'tenor should be between 1 and 12'; }
  if (tenor && !tenor.match(/^[0-9]+$/)) { error.tenor = 'tenor must be a number'; }
  if (tenor && parseInt(tenor, 10) > 12) { error.tenor = 'tenor should be between 1 and 12'; }
  if (!amount) { error.amount = 'loan amount is required'; }
  if (amount && !amount.match(/^[0-9]+$/)) { error.amount = 'amount must be a number'; }
  if (amount && parseFloat(amount) < 10000) { error.amount = 'loan amount should be between 10000 to 200000'; }
  if (amount && parseFloat(amount) > 200000) { error.amount = 'loan amount should be between 10000 to 200000'; }
  if (amount > 9999999) { error.amount = 'amount way above limit'; }
  if (Object.keys(error).length === 0 && error.constructor === Object){
    return next();
  }


  return res.status(400)
    .json({
      status: 400,
      error
    });
};
