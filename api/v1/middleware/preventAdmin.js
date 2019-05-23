/**
     * Prevent admin from creating loan
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
const adminPrevent = (req, res, next) => {
  // Authorizing the Admin
  if (req.user.isAdmin) {
    return res.status(403)
      .json({
        status: 403,
        error: 'Access Denied'
      });
  }
  return next();
};
  
export default adminPrevent;
