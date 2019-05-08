
const admin = (req, res, next) => {
  
  // Authorizing the Admin
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
