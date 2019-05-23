/* eslint-disable import/prefer-default-export */

/**
     * Validate repayment
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
export const validateRepayment = (req, res, next) => {
  const { paidAmount } = req.body;
  const error = {};
  if (!paidAmount) {
    error.paidAmount = 'payment is required';
  }
  if (paidAmount > 9999999){
    error.paidAmount = 'way above limit';
  }
  if (Object.keys(error).length === 0 && error.constructor === Object){
    return next();
  }

  return res.status(400)
    .json({
      status: 400,
      error
    });
};
