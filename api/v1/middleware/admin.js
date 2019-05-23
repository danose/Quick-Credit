/**
     * Authorize an admin
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} response object
     */
const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403)
      .json({
        status: 403,
        error: 'Access Denied'
      });
  }
  return next();
};

export default admin;
